import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// TODO: Add this component to freecodecamp/ui and remove this dependency
import { Disclosure } from '@headlessui/react';

import { SuperBlocks } from '../../../../../shared/config/curriculum';
import DropDown from '../../../assets/icons/dropdown';
// TODO: See if there's a nice way to incorporate the structure into data Gatsby
// sources from the curriculum, rather than importing it directly.
import superBlockStructure from '../../../../../curriculum/superblock-structure/full-stack.json';
import { ChapterIcon } from '../../../assets/chapter-icon';
import { BlockLayouts, BlockTypes } from '../../../../../shared/config/blocks';
import { FsdChapters } from '../../../../../shared/config/chapters';
import { type Module } from '../../../../../shared/config/modules';
import envData from '../../../../config/env.json';
import Block from './block';
import CheckMark from './check-mark';

import './super-block-accordion.css';

const { showUpcomingChanges } = envData;

interface ChapterProps {
  dashedName: string;
  children: ReactNode;
  comingSoon?: boolean;
  isExpanded: boolean;
  totalSteps: number;
  completedSteps: number;
}

interface ModuleProps {
  dashedName: string;
  children: ReactNode;
  isExpanded: boolean;
  totalSteps: number;
  completedSteps: number;
}

interface Challenge {
  id: string;
  block: string;
  blockType: BlockTypes;
  title: string;
  fields: { slug: string };
  dashedName: string;
  challengeType: number;
  blockLayout: BlockLayouts;
  superBlock: SuperBlocks;
}

interface SuperBlockAccordionProps {
  challenges: Challenge[];
  superBlock: SuperBlocks;
  chosenBlock: string;
  completedChallengeIds: string[];
}

const modules = superBlockStructure.chapters.flatMap<Module>(
  ({ modules }) => modules
);
const chapters = superBlockStructure.chapters;

const isLinkModule = (name: string) => {
  const module = modules.find(module => module.dashedName === name);

  return module?.moduleType === 'review';
};

const getBlockToChapterMap = () => {
  const blockToChapterMap = new Map<string, string>();
  chapters.forEach(chapter => {
    chapter.modules.forEach(module => {
      module.blocks.forEach(block => {
        blockToChapterMap.set(block.dashedName, chapter.dashedName);
      });
    });
  });

  return blockToChapterMap;
};

const getBlockToModuleMap = () => {
  const blockToModuleMap = new Map<string, string>();
  modules.forEach(module => {
    module.blocks.forEach(block => {
      blockToModuleMap.set(block.dashedName, module.dashedName);
    });
  });

  return blockToModuleMap;
};

const blockToChapterMap = getBlockToChapterMap();
const blockToModuleMap = getBlockToModuleMap();

const Chapter = ({
  dashedName,
  children,
  isExpanded,
  comingSoon,
  totalSteps,
  completedSteps
}: ChapterProps) => {
  const { t } = useTranslation();
  const isComplete = completedSteps === totalSteps;

  return (
    <Disclosure as='li' className='chapter' defaultOpen={isExpanded}>
      <Disclosure.Button
        className='chapter-button'
        data-playwright-test-label='chapter-button'
      >
        <div className='chapter-button-left'>
          <ChapterIcon
            className='map-icon'
            chapter={dashedName as FsdChapters}
          />
          {t(`intro:full-stack-developer.chapters.${dashedName}`)}
        </div>
        <div className='chapter-button-right'>
          {!comingSoon && (
            <>
              <span className='chapter-steps'>
                {t('learn.steps-completed', {
                  totalSteps,
                  completedSteps
                })}
              </span>
              <span className='checkmark-wrap chapter-checkmark-wrap'>
                <CheckMark isCompleted={isComplete} />
              </span>
            </>
          )}
          <span className='dropdown-wrap'>
            <DropDown />
          </span>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel as='ul' className='chapter-panel'>
        {children}
      </Disclosure.Panel>
    </Disclosure>
  );
};

const Module = ({
  dashedName,
  children,
  isExpanded,
  totalSteps,
  completedSteps
}: ModuleProps) => {
  const { t } = useTranslation();
  const isComplete = completedSteps === totalSteps;

  return (
    <Disclosure as='li' defaultOpen={isExpanded}>
      <Disclosure.Button className='module-button'>
        <div className='module-button-left'>
          <span className='dropdown-wrap'>
            <DropDown />
          </span>
          {t(`intro:full-stack-developer.modules.${dashedName}`)}
        </div>
        <div className='module-button-right'>
          <span className='module-steps'>
            {t('learn.steps-completed', {
              totalSteps,
              completedSteps
            })}
          </span>
          <span className='checkmark-wrap'>
            <CheckMark isCompleted={isComplete} />
          </span>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel as='ul' className='module-panel'>
        {children}
      </Disclosure.Panel>
    </Disclosure>
  );
};

const LinkBlock = ({
  superBlock,
  challenges
}: {
  superBlock: SuperBlocks;
  challenges?: Challenge[];
}) =>
  challenges?.length ? (
    <li className='link-block'>
      <Block
        block={challenges[0].block}
        blockType={challenges[0].blockType}
        challenges={challenges}
        superBlock={superBlock}
      />
    </li>
  ) : null;

export const SuperBlockAccordion = ({
  challenges,
  superBlock,
  chosenBlock,
  completedChallengeIds
}: SuperBlockAccordionProps) => {
  const { t } = useTranslation();
  const { allChapters } = useMemo(() => {
    const populateBlocks = (blocks: { dashedName: string }[]) =>
      blocks.map(block => {
        const blockChallenges = challenges.filter(
          ({ block: blockName }) => blockName === block.dashedName
        );

        return {
          name: block.dashedName,
          blockType: blockChallenges[0]?.blockType ?? null,
          challenges: blockChallenges
        };
      });

    const allChapters = chapters.map(chapter => ({
      name: chapter.dashedName,
      comingSoon: chapter.comingSoon,
      modules: chapter.modules.map((module: Module) => ({
        name: module.dashedName,
        comingSoon: module.comingSoon,
        moduleType: module.moduleType,
        blocks: populateBlocks(module.blocks)
      }))
    }));

    return { allChapters };
  }, [challenges]);

  // Expand the outer layers in order to reveal the chosen block.
  const expandedChapter = blockToChapterMap.get(chosenBlock);
  const expandedModule = blockToModuleMap.get(chosenBlock);

  return (
    <ul className='super-block-accordion'>
      {allChapters.map(chapter => {
        const chapterStepIds: string[] = [];
        chapter.modules.forEach(module => {
          const { blocks } = module;
          blocks.forEach(block =>
            chapterStepIds.push(...block.challenges.map(c => c.id))
          );
        });

        const chapterStepIdsSet = new Set(chapterStepIds);
        const completedStepsInChapter = new Set(
          completedChallengeIds.filter(id => chapterStepIdsSet.has(id))
        ).size;

        return (
          <Chapter
            key={chapter.name}
            dashedName={chapter.name}
            isExpanded={expandedChapter === chapter.name}
            comingSoon={chapter.comingSoon}
            totalSteps={chapterStepIds.length}
            completedSteps={completedStepsInChapter}
          >
            {chapter.modules.map(module => {
              if (module.comingSoon && !showUpcomingChanges) {
                if (module.moduleType === 'review') {
                  return null;
                }

                const { note, intro } = t(
                  `intro:full-stack-developer.module-intros.${module.name}`,
                  { returnObjects: true }
                ) as {
                  note: string;
                  intro: string[];
                };

                return (
                  <Disclosure
                    key={module.name}
                    as='li'
                    defaultOpen={expandedModule === module.name}
                  >
                    <Disclosure.Button className='module-button'>
                      <div className='module-button-left'>
                        <span className='dropdown-wrap'>
                          <DropDown />
                        </span>
                        {t(`intro:full-stack-developer.modules.${module.name}`)}
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel as='ul' className='module-panel'>
                      <div className='module-intro'>
                        {note && (
                          <p>
                            <b>{note}</b>
                          </p>
                        )}
                        {intro &&
                          intro.length > 0 &&
                          intro.map(ntro => <p key={ntro}>{ntro}</p>)}
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                );
              }

              if (isLinkModule(module.name)) {
                return (
                  <LinkBlock
                    key={module.name}
                    superBlock={superBlock}
                    challenges={module.blocks[0]?.challenges}
                  />
                );
              }

              const moduleStepIds: string[] = [];
              module.blocks.forEach(block =>
                moduleStepIds.push(...block.challenges.map(c => c.id))
              );

              const moduleStepIdsSet = new Set(moduleStepIds);
              const completedStepsInModule = new Set(
                completedChallengeIds.filter(id => moduleStepIdsSet.has(id))
              ).size;

              return (
                <Module
                  key={module.name}
                  dashedName={module.name}
                  isExpanded={expandedModule === module.name}
                  totalSteps={moduleStepIds.length}
                  completedSteps={completedStepsInModule}
                >
                  {module.blocks.map(block => (
                    // maybe TODO: allow blocks to be "coming soon"
                    <li key={block.name}>
                      <Block
                        block={block.name}
                        blockType={block.blockType}
                        challenges={block.challenges}
                        superBlock={superBlock}
                      />
                    </li>
                  ))}
                </Module>
              );
            })}
          </Chapter>
        );
      })}
    </ul>
  );
};
