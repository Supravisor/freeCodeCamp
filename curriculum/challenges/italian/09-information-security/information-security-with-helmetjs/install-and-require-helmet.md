---
id: 587d8247367417b2b2512c36
title: Installare e richiedere Helmet
challengeType: 2
forumTopicId: 301581
dashedName: install-and-require-helmet
---

# --description--

Lavorare su queste sfide ti porterà a scrivere il tuo codice utilizzando uno dei seguenti metodi:

- Clonare <a href="https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">questo repository GitHub</a> e completare queste sfide localmente.
- Use <a href="https://gitpod.io/?autostart=true#https://github.com/freeCodeCamp/boilerplate-infosec/" target="_blank" rel="noopener noreferrer nofollow">our Gitpod starter project</a> to complete these challenges.
- Usare un costruttore di siti a tua scelta per completare il progetto. Assicurati di incorporare tutti i file del nostro repository GitHub.

Helmet ti aiuta a proteggere le tue app Express impostando varie intestazioni HTTP.

# --instructions--

Tutto il tuo codice per queste lezioni va nel file `myApp.js` tra le righe di codice con cui hai iniziato. Non modificare o eliminare il codice che abbiamo aggiunto per te.

Helmet versione `3.21.3` è già stato installato, quindi richiedilo come `helmet` in `myApp.js`.

# --hints--

`helmet` versione `3.21.3` dovrebbe essere in `package.json`

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      const packJson = JSON.parse(data);
      const helmet = packJson.dependencies.helmet;
      assert(helmet === '3.21.3' || helmet === '^3.21.3');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

