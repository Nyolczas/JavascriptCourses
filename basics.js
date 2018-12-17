// ternális operátor

var firstName = 'Jani';
var age = 16;

age >= 18 ? console.log(firstName + ' ihat sört.') : console.log(firstName + ' csak üdítőt ihat.');

// switch statement

var job = 'grafikus';

switch (job) {
    case 'grafikus':
        console.log(firstName + ' ha megtanul kódolni is, akkor nagyon kapós lesz a munkaerőpiacon');
        break;
    case 'tanár':
        console.log(firstName + ' a halgatókat megtanítja kódolni.');
        break;
    case 'sofőr':
        console.log(firstName + ' autót vezet, de olvasni tud?');
        break;
    default:
        console.log(firstName + ' valami mást csinál');
}