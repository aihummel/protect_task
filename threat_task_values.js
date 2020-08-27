n_trials = 100;

var stakes_1 = 'img/dragon_1.png';
var stakes_2 = 'img/dragon_2.png';
var stakes_3 = 'img/dragon_3.png';
var stakes_4 = 'img/dragon_4.png';

var low_stakes = {
    stakes_a: stakes_1,
    stakes_b: stakes_2
};

var high_stakes = {
    stakes_a: stakes_3,
    stakes_b: stakes_4
};

stakes_types = [
    {stakes: stakes_1, ...low_stakes},
    {stakes: stakes_2, ...low_stakes},
    {stakes: stakes_3, ...high_stakes},
    {stakes: stakes_4, ...high_stakes},
];

var result_1 = 'img/gnome_blue.png';
var result_2 = 'img/gnome_orange.png';

var choice_11 = {
    name: 'img/tree_3.png',  // shown with choice_12
    result: result_1
}
var choice_21 = {
    name: 'img/tree_9.png',  // shown with choice_22
    result: result_1
}
var choice_12 = {
    name: 'img/tree_7.png',  // shown with choice_11
    result: result_2
}
var choice_22 = {
    name: 'img/tree_8.png',  // shown with choice_21
    result: result_2
}

var get_result = function(choice) {
    if (choice == choice_11.name) return choice_11.result;
    else if (choice == choice_21.name) return choice_21.result;
    else if (choice == choice_12.name) return choice_12.result;
    else if (choice == choice_22.name) return choice_22.result;
}

var choices_types = [
    {choice_a: choice_11, choice_b: choice_12, type: '1'},
    {choice_a: choice_12, choice_b: choice_11, type: '1\''},
    {choice_a: choice_21, choice_b: choice_22, type: '2'},
    {choice_a: choice_22, choice_b: choice_21, type: '2\''},
];

var resource_img = 'img/shield.png';
var resource_imgs = [null];
for (var i = 1; i <= 9; i++) {
    resource_imgs.push('img/shield_' + i + '.png');
};

wording = 'Protected from';
