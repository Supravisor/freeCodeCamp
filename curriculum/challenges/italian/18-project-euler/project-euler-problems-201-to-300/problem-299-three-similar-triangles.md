---
id: 5900f4971000cf542c50ffaa
title: 'Problema 299: tre triangoli simili'
challengeType: 1
forumTopicId: 301951
dashedName: problem-299-three-similar-triangles
---

# --description--

Sono selezionati quattro punti con coordinate intere:

$A(a, 0)$, $B(b, 0)$, $C(0, c)$ e $D(0, d)$, con $0 &lt; a &lt; b$ e $0 &lt; c &lt; d$.

Il punto $P$, anch'esso con coordinate intere, è scelto sulla linea $AC$ in modo che i tre triangoli $ABP$, $CDP$ e $BDP$ siano tutti simili.

<img alt="i punti A, B, C, D e P che creano tre triangoli: ABP, CDP e BDP" src="https://cdn.freecodecamp.org/curriculum/project-euler/three-similar-triangles.gif" style="background-color: white; padding: 10px; display: block; margin-right: auto; margin-left: auto; margin-bottom: 1.2rem;" />

È facile dimostrare che i tre triangoli possono essere simili, solo se $a = c$.

Quindi, dato che $a = c$, stiamo cercando terne ($a$, $b$, $d$) tali che almeno un punto $P$ (con coordinate intere) esista su $AC$, rendendo i tre triangoli $ABP$, $CDP$ e $BDP$ tutti simili.

Ad esempio, se $(a, b, d) = (2, 3, 4)$, può essere facilmente verificato che il punto $P(1, 1)$ soddisfa la condizione di cui sopra. Si noti che le terne (2,3,4) e (2,4,3) sono considerate distinte, anche se il punto $P(1, 1)$ è comune a entrambe.

Se $b + d &lt; 100$, ci sono 92 terne distinte ($a$, $b$, $d$) tali che il punto $P$ esista.

Se $b + d &lt; 100\\,000$, ci sono 320471 terne distinte ($a$, $b$, $d$) tali che il punto $P$ esista.

Se $b + d &lt; 100\\,000\\,000$, quante terne distinte ($a$, $b$, $d$) ci sono tali che il punto $P$ esista?

# --hints--

`threeSimilarTriangles()` dovrebbe restituire `549936643`.

```js
assert.strictEqual(threeSimilarTriangles(), 549936643);
```

# --seed--

## --seed-contents--

```js
function threeSimilarTriangles() {

  return true;
}

threeSimilarTriangles();
```

# --solutions--

```js
// solution required
```
