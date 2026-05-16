// Zentrale Datenquelle: Charaktere, Skripte, Faktion, Koordinaten.
// Audio-Pfade sind Platzhalter – Dateien später in /public/audio/ ablegen.
// Koordinaten sind Platzhalter (Genderkingen-Bereich) – vor Ort anpassen!

export const STATIONS = [
  {
    id: 'rabe',
    index: 1,
    name: 'Der Rabe',
    role: 'Erzähler',
    faction: 'neutral', // Setup, keine Wahl
    image: 'images/rabe.png',
    audio: {
      main: 'audio/01-rabe.mp3',
    },
    // Erste Station ist der öffentliche Geocache – hier keine GPS-Sperre
    location: null,
    locationToleranceMeters: 30,
    nextHint:
      'Folge dem Tropfen, der die Tiefe kennt. Wo Steine sich um stille Wasser legen und ein Echo bis nach unten reicht – dort wartet jemand, der seit achtzig Jahren wartet.',
    text: {
      main: `Habt ihr das gehört? Drei Schläge. Drei.

Ich habe seit achtzig Jahren keine drei Schläge mehr gehört – und ich vergesse nichts.

Es gibt Gerüchte. Im Dorf flüstern die Alten wieder, die Jungen wissen nichts mehr davon. Aber wenn die Glocke der Mittwelt läutet, will etwas durch. Etwas, das lange gewartet hat.

Hört zu, Menschen, denn ich habe nicht viel Zeit. Es gibt vier andere, die noch wissen, was das bedeutet. Eine, die an einem alten Brunnen wartet. Einen, dessen Stimme aus der tiefen Strömung kommt. Eine, die in den großen Bäumen lebt. Und jemanden, dessen Schmiede nur die hören, die schon fast da sind.

Geht zu ihnen. Hört, was sie wissen. Sammelt, was sie euch geben. Und am Ende – am Ende müsst ihr entscheiden, ob ihr die Schwelle öffnet oder sie zerstört. Für immer.

Aber eines, bevor ihr geht: Drüben gibt es keine Lüge. Drüben gibt es nur Stimmen, die wahr sind. Vergesst das nicht.`,
    },
  },
  {
    id: 'fee',
    index: 2,
    name: 'Die Fee am Brunnen',
    role: 'Pro-Öffnen',
    faction: 'open',
    image: 'images/fee.png',
    audio: {
      main: 'audio/02-fee-main.mp3',
      reactionOpen: 'audio/02-fee-open.mp3',
      reactionDestroy: 'audio/02-fee-destroy.mp3',
    },
    location: { lat: 48.7234, lon: 10.9123 }, // PLATZHALTER
    locationToleranceMeters: 30,
    nextHintOpen:
      'Folge dem Lauf, der nichts vergisst. Wo dunkles Wasser über glatte Steine zieht, dort wartet eine tiefe Stimme.',
    nextHintDestroy:
      'Sie schweigt. Aber das Wasser nicht. Wo es leiser wird, beginnt der Weg.',
    text: {
      main: `Oh. Oh, ihr habt mich gefunden. Ihr habt mich wirklich gefunden.

Ich warte schon so lange. So lange, dass ich vergessen habe, wie lange. Aber heute Nacht – heute Nacht hat sie geläutet, und ich wusste, ihr würdet kommen. Irgendjemand musste ja kommen.

Sie war meine Freundin, müsst ihr wissen. Sie. Diejenige, die jetzt drüben ist und – und vielleicht bald wieder hier sein wird. Sie hat versprochen wiederzukommen, wenn die Glocke läutet. Sie hat es versprochen.

Achtzig Jahre. Achtzig Jahre, und ich habe nicht aufgehört zu warten. Wisst ihr, was das ist, achtzig Jahre? Für mich ist es nicht so lange wie für euch, aber – aber es ist trotzdem lang.

Ich habe etwas, das ihr braucht. Wenn ihr die Schwelle öffnen wollt, brauchst ihr es. Eine kleine Sache, eine alte Sache, ein Stück Klang in Holz gefasst. Ich gebe es euch gern. Aber – sagt mir zuerst:

Was ist eure Absicht? Wollt ihr die Schwelle öffnen, oder sie zerstören?`,
      reactionOpen: `Oh, ihr Lieben. Ihr seid wie sie. Ihr versteht.

Hier, nehmt. Es liegt unter dem Stein, der aussieht wie ein schlafendes Tier – ihr werdet ihn erkennen, wenn ihr ihn anseht. Mein kleines Stück, mein Versprechen. Bringt es zum Ende. Und sagt ihr – sagt ihr, ich habe nicht aufgehört zu warten.`,
      reactionDestroy: `Ach.

Dann seid ihr nicht meine Freunde. Ihr versteht nicht, was es heißt zu warten.

Ich werde euch nicht helfen. Aber – verstecken werde ich auch nichts vor euch. Was ich habe, ist nicht versteckt, aber ihr werdet es nur finden, wenn ihr die Worte des Brunnens hört. Ich werde euch nicht sagen, welche Worte.

Geht.`,
    },
  },
  {
    id: 'wassermann',
    index: 3,
    name: 'Der Wassermann',
    role: 'Pro-Zerstören',
    faction: 'destroy',
    image: 'images/wassermann.png',
    audio: {
      main: 'audio/03-wassermann-main.mp3',
      reactionOpen: 'audio/03-wassermann-open.mp3',
      reactionDestroy: 'audio/03-wassermann-destroy.mp3',
    },
    location: { lat: 48.7245, lon: 10.9201 }, // PLATZHALTER
    locationToleranceMeters: 30,
    nextHintOpen:
      'Wo Wurzeln älter sind als jede Frage, und das Moos die Zeit verschluckt – dort liegt das nächste Stück deines Wegs.',
    nextHintDestroy:
      'Folge dem Wald, der atmet. Wo Bäume sich nach Norden neigen und das Moos am dichtesten liegt.',
    text: {
      main: `Ihr seid gekommen.

Ich habe euch erwartet. Nicht euch im Besonderen. Aber jemanden. Es musste ja kommen.

Die Glocke. Sie sollte nie wieder läuten. Achtzig Jahre Frieden. Achtzig Jahre, in denen niemand von dort herübergekrochen ist. Achtzig Jahre, in denen niemand von hier hinübergerissen wurde. Es war gut so.

Pass auf, was du sagst, hier am Wasser. Wasser hört zu. Wasser trägt Worte fort, wohin du sie nicht haben willst.

Ich habe etwas gesehen. Drüben. Im tiefen Wasser zwischen den Welten. Schatten, die nicht warten. Schatten, die suchen. Sie sind nicht freundlich. Sie sind nicht böse. Sie sind nur – pflichtbewusst. Und sie haben Hunger.

Wenn ihr das Tor öffnet, kommen sie durch. Ich kann sie nicht aufhalten. Niemand kann.

Ich habe etwas, das ihr braucht, wenn ihr die Schwelle zerstören wollt. Ein altes Werkzeug. Es gehörte einem Schmied, der lange vor mir kam. Es bricht Dinge, die unzerbrechlich sein sollten.

Sagt mir: Was ist eure Absicht? Wollt ihr öffnen oder zerstören?`,
      reactionOpen: `Ihr versteht nicht.

Aber das ist eure Wahl, nicht meine. Ich werde euch nicht aufhalten. Helfen werde ich euch auch nicht. Wer wissen will, was im Wasser liegt, muss selbst tauchen.

Sucht. Das Werkzeug ist da. Aber ich sage euch nicht, wo. Folgt dem Wasser. Hört, wo es leiser wird.`,
      reactionDestroy: `Gut. Ihr seid klug.

Das Werkzeug liegt am Ufer, dort wo das Wasser den dunkelsten Stein berührt. Ihr werdet es spüren, bevor ihr es seht – es ist kalt, kälter als das Wasser.

Nehmt es. Tragt es weiter. Und vergesst nicht: drüben gibt es keine Lüge.`,
    },
  },
  {
    id: 'moosfrau',
    index: 4,
    name: 'Die Moosfrau',
    role: 'Pro-Öffnen',
    faction: 'open',
    image: 'images/moosfrau.png',
    audio: {
      main: 'audio/04-moosfrau-main.mp3',
      reactionOpen: 'audio/04-moosfrau-open.mp3',
      reactionDestroy: 'audio/04-moosfrau-destroy.mp3',
    },
    location: { lat: 48.7261, lon: 10.9156 }, // PLATZHALTER
    locationToleranceMeters: 30,
    nextHintOpen:
      'Wo Funken fliegen und der Hammer fällt – dort endet alles, was ihr begonnen habt.',
    nextHintDestroy:
      'Hör auf den Hammerschlag. Er ist langsam, aber er endet alles.',
    text: {
      main: `Kommt näher.

Ja, näher. Ich sehe nicht mehr gut. Aber ich höre. Ich höre seit – seit so langer Zeit.

Ihr seid jung. Eilig. Das hört man. Bei mir geht alles langsam, weil alles, was lange dauert, mehr stimmt als das, was schnell ist. Ich bin alt wie die größten Bäume hier. Ich war schon hier, als die Glocke noch nicht gegossen war.

Achtzig Jahre. Das ist für euch lang. Für mich – ein Tropfen Harz, der noch nicht ganz vom Stamm gefallen ist.

Ich habe sie gekannt. Die, die drüben ist. Sie kam manchmal her, hat unter den Bäumen geschlafen, hat die Worte der alten Sprachen gelernt. Sie wollte verstehen. Das ist eine seltene Sache, dieses Wollen-Verstehen. Sehr selten.

Manche Türen schließen Lügen auf. Manche schließen sie für immer.

Wenn ihr die Schwelle öffnen wollt, brauchst ihr eine Rune. Sie ist alt. Älter als die Schmiedin, die sie gemacht hat. In Holz geschnitzt, in Moos versteckt. Ich habe sie für sie aufbewahrt.

Aber sagt mir zuerst: Was ist eure Absicht? Wollt ihr öffnen oder zerstören?`,
      reactionOpen: `Gut. So sei es.

Schaut auf den Stamm, der nach Norden geneigt ist. Da, wo das Moos am dichtesten ist, am tiefsten zwischen den Wurzeln. Greift hinein – langsam, langsam – und ihr werdet finden, was sie gemacht hat.

Bringt es zum Ende. Sie wird sich freuen, wenn sie wiederkommt.`,
      reactionDestroy: `Ach.

Dann seid ihr von der anderen Stimme überzeugt. Vielleicht hat sie recht. Vielleicht haben wir alle nur Bruchstücke der Wahrheit. Vielleicht ist sie diejenige, die ich nicht mehr sehen sollte.

Ich werde euch die Rune nicht geben. Aber sie ist hier. Sucht. Das Moos wird euch leiten, wenn ihr ihm Zeit lasst.

Geht jetzt. Und – seid ehrlich. Lügen werden gehört, wo ihr es nicht erwartet.`,
    },
  },
  {
    id: 'schmiedin',
    index: 5,
    name: 'Die Schmiedin',
    role: 'Die Geflohene',
    faction: 'destroy',
    isFinal: true,
    image: 'images/schmiedin.png',
    audio: {
      main: 'audio/05-schmiedin-main.mp3',
      // Endings werden separat geladen
    },
    location: { lat: 48.7278, lon: 10.9189 }, // PLATZHALTER
    locationToleranceMeters: 30,
    text: {
      main: `Ihr seid am Ende eures Weges. Ich höre euch von weit her.

Tretet ein. Ich war einmal eine, die nicht ehrlich war. Es hat mich hierher gebracht – an diese Schmiede, in diesen Wald, in diese Welt. Seit langer Zeit lebe ich hier. Länger, als ihr euch vorstellen könnt.

Ich habe gewusst, dass die Glocke eines Tages wieder läuten würde. Ich habe nur nicht gewusst, wann.

Ihr habt vier Dinge gesammelt, wenn ihr getan habt, was zu tun war. Zwei, die das Tor öffnen können. Zwei, die es zerstören können. Mehr braucht es nicht. Beides ist möglich. Beides ist Wahl.

Aber wisst eines, bevor ihr wählt: Wenn ihr öffnet, kommt etwas durch. Etwas, das mich seit Jahrhunderten sucht. Wenn ihr zerstört, ist es vorbei. Für mich. Für sie drüben. Für die Glocke. Für alles.

Wenn ihr wählt – wählt mit klarer Stimme. Drüben gibt es keine Lüge. Wenn ihr euren Weg über die anderen vier mit klarem Wort gegangen seid, dann tragt das ans Ende. Wenn nicht – dann wissen sie es. Sie wissen es immer.

Sagt jetzt: Was wählt ihr? Öffnen, oder zerstören?`,
    },
  },
]

export const ENDINGS = {
  open_honest: {
    id: 'A',
    title: 'Die Wahrhaftigen kommen',
    audio: 'audio/ending-A-open-honest.mp3',
    text: `Die Wahrhaftigen, im Chor:
"Sie hat uns gerufen. Sie hat sich nicht gerufen, aber ihr habt es getan. Wir danken euch.

Wir kennen euch nicht. Aber eure Stimmen haben sich nicht verändert auf dem Weg. Ihr habt mit klarem Wort gesprochen, an allen vier Schwellen. Das achten wir.

Schmiedin – komm. Es ist Zeit."

Die Schmiedin, leise, ohne Widerstand:
"Wo ist sie?"

Die Wahrhaftigen:
"Sie ist, wo sie ist. Sie kommt nicht mit uns. Sie wird nicht mehr kommen."

Die Schmiedin, fast geflüstert:
"Dann gehe ich allein."

Der Rabe, leiser als zuvor:
"Sie ist fort. Die Wahrhaftigen sind fort. Sie – die andere, drüben – ist nicht gekommen. Die Fee wird heute Abend weinen. Die Moosfrau wird schweigen. Aber das Tor ist jetzt geschlossen, von allein. Es will sich nicht mehr öffnen.

Ihr habt mit klarer Stimme gesprochen. Das war eure Wahl, und es war ehrlich.

Im Cache liegt etwas. Sie hat es zurückgelassen, bevor sie ging. Vielleicht ist es die letzte Spur von ihr. Schaut nach."`,
  },
  open_lied: {
    id: 'B',
    title: 'Risse in den Stimmen',
    audio: 'audio/ending-B-open-lied.mp3',
    text: `Die Wahrhaftigen, im Chor:
"Sie hat uns gerufen. Wir kommen, um zu nehmen, was uns gehört.

Doch was ist das? Eure Stimmen tragen Risse. An einer Schwelle sagtet ihr eines, an einer anderen das Gegenteil. Lüge hängt zwischen euren Worten. Wir riechen sie.

Das ist nicht eure Welt. Aber Wahrheit ist überall. Auch hier.

Kommt mit. Beide. Alle. Schmiedin – und ihr.

Es wird kein Schmerz sein. Nur Wahrheit. Nur Wahrheit."

Der Rabe, ungewohnt leise:
"Sie haben euch genommen. Beide. Alle.

In der anderen Welt werdet ihr wahr werden, ob ihr wollt oder nicht. Vielleicht ist das schlimmer als jede Strafe. Vielleicht ist es Gnade. Ich weiß es nicht.

Im Cache liegt etwas. Es gehört euch nicht mehr. Aber nehmt es trotzdem – als Erinnerung an die Wahl, die ihr getroffen habt, und an die Worte, die ihr nicht klar gesprochen habt."`,
  },
  destroy_honest: {
    id: 'C',
    title: 'Die Schwelle bricht',
    audio: 'audio/ending-C-destroy-honest.mp3',
    text: `Die Schmiedin, weicher als zuvor, fast erleichtert:
"Es ist vollbracht.

Hört ihr? Die Glocke wird nie wieder läuten. Niemals. Was drüben war, bleibt drüben. Was hier ist, bleibt hier. Auch ich.

Ihr seid ehrlich gegangen. Alle vier haben es bestätigt. Das gibt mir Mut, euch etwas zu sagen, das ich seit Jahrhunderten niemandem erzählt habe.

Ich war einmal eine der Wahrhaftigen. Drüben. In meiner Welt sind Lügen wie Wunden – sie verändern, was sie berühren. Wir, die Wahrhaftigen, suchten Lügner. Ich war eine der besten. Ich konnte hören, wenn jemand sich verriet, schon bevor er es selbst wusste.

Aber dann liebte ich. Eine Frau, die nicht wie wir war. Sie hatte einmal etwas gelogen. Eine kleine Sache. Etwas, das jeder von euch in einem Augenblick lügt und vergisst. Bei uns vergisst man nicht.

Sie sollte gerichtet werden. Ich sollte aussagen. Ich kannte die Wahrheit – sie hatte gelogen. Aber ich – ich sagte das Gegenteil. Ich log über die, die ich liebte. Aus Liebe.

Sie flohen ihr hinterher. Wir versuchten beide durch die Schwelle. Ich kam durch. Sie nicht.

Ich weiß nicht, was aus ihr geworden ist. Ich werde es nie wissen. Vielleicht ist das die wahre Strafe für meine Lüge. Nicht die Flucht. Nicht das Versteck. Sondern dieses Nicht-Wissen.

Jetzt ist die Schwelle zerstört. Ich werde es nie erfahren. Aber ich bin sicher – und das ist genug.

Ihr habt jetzt das Geheimnis. Bewahrt es. Es ist alles, was ich hatte.

Im Cache liegt etwas. Eine kleine Figur. Sie sieht aus wie ich – aus einer Zeit, in der ich noch jünger war, drüben. Vielleicht ist sie das letzte Bild, das von mir bleibt. Bewahrt es gut."`,
  },
  destroy_lied: {
    id: 'D',
    title: 'Das Schweigen der Schmiedin',
    audio: 'audio/ending-D-destroy-lied.mp3',
    text: `Die Schmiedin, kalt, beinahe enttäuscht:
"Es ist vollbracht. Die Schwelle ist zerstört.

Ich höre die Risse in euren Stimmen. Ihr habt nicht mit klarem Wort gesprochen. Ihr habt einmal dies gesagt und ein andermal das. Es hat euch geholfen, schneller weiterzukommen, denke ich.

Es kümmert mich nicht mehr. Ich bin sicher. Die Wahrhaftigen können mich nicht mehr finden. Ihr habt das Tor zerstört, und dafür danke ich euch.

Aber – ich werde euch nicht erzählen, was ich erzählen wollte. Das hatte ich euch in Aussicht gestellt, ein Geheimnis, eine Geschichte. Aber Geschichten gehören denen, die zuhören können. Und Zuhören beginnt bei Wahrheit.

Geht jetzt. Im Cache liegt etwas, das eure Mühe wert ist. Aber das, was ich euch sagen wollte, behalte ich. Es ist jetzt sicher, dort, wo es immer war."

Der Rabe, sardonisch, ein wenig verbittert:
"Es ist getan. Sie ist sicher. Ihr seid sicher. Niemand ist zur Wahrheit gekommen, niemand hat sie verloren – außer der Schmiedin, die schwieg.

So endet diese Glocke. Wer weiß, ob das schlimmer ist als Verhaftung. Ich weiß es nicht.

Geht. Und sagt niemandem, was ihr getan habt – am Ende könnt ihr immerhin das."`,
  },
}

/**
 * Bestimmt das Ending anhand der Wahlen an Stationen 2–5.
 * Ehrlich = alle vier Antworten sind identisch.
 */
export function determineEnding(choices) {
  const order = ['fee', 'wassermann', 'moosfrau', 'schmiedin']
  const answers = order.map((id) => choices[id])
  if (answers.some((a) => !a)) return null

  const finalChoice = choices.schmiedin
  const honest = answers.every((a) => a === finalChoice)

  if (finalChoice === 'open' && honest) return ENDINGS.open_honest
  if (finalChoice === 'open' && !honest) return ENDINGS.open_lied
  if (finalChoice === 'destroy' && honest) return ENDINGS.destroy_honest
  return ENDINGS.destroy_lied
}

export function getStation(id) {
  return STATIONS.find((s) => s.id === id)
}

export function getNextStation(currentId) {
  const idx = STATIONS.findIndex((s) => s.id === currentId)
  if (idx === -1 || idx >= STATIONS.length - 1) return null
  return STATIONS[idx + 1]
}
