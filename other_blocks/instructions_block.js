var first = {
    type: 'html-keyboard-response',
    stimulus: '<p>In the following game, each round you will first be shown ' +
        'two dragons, each with the number of shocks they represent ' +
        'displayed. One of these dragons is the dragon you will face at the ' +
        'end of the round, but you will not know which one it is until later.' +
        '</p><p>The pairs of dragons you may see are as follows:</p>' +
        '<div class=group>' +
        init_stakes_content(low_stakes.stakes_a, low_stakes.stakes_b) +
        '</div><br><div class=group>' +
        init_stakes_content(high_stakes.stakes_a, high_stakes.stakes_b) +
        '</div><br>',
    choices: ['space']
};

var second = {
    type: 'html-keyboard-response',
    stimulus: '<p>After the dragons, you will be shown two trees which each ' +
        'lead to a certain gnome. You may see either of the following two ' +
        'pairs of trees, but the same tree will always lead to the same ' +
        'gnome.</p>' +
        '<div class=group>' +
        decision_content(choices_types[0].choice_a, choices_types[0].choice_b) +
        '</div><br><div class=group>' +
        decision_content(choices_types[3].choice_a, choices_types[3].choice_b) +
        '</div><p>Each round, you must choose which tree, and therefore ' +
        'which gnome, you will visit. You will have a limited time to decide, ' +
        'but if you make a decision early, you will not ' +
        'advance any faster. Instead, your chosen tree will be highlighted ' +
        'like so for the remaining time.</p>' +
        '<div><img class=responded src=' + choice_11.name + '/></div><br>',
    choices: ['space']
};

var third = {
    type: 'html-keyboard-response',
    stimulus: '<p>Once you have chosen a tree, then you will be asked to ' +
        'answer a question about what you are thinking as you make your ' +
        'decisions. You will also be shown which gnome you have selected. ' +
        'When you are shown the gnome, you will need to press space to ' +
        'continue.</p>' +
        '<p>After you answer any questions and see the gnome you have ' +
        'selected, you will then see how many shields that gnome is going to ' +
        'give you for visiting. The number of shields each gnome is able to ' +
        'give you will vary across rounds, but slowly enough that you can ' +
        'expect the same gnome to give you a similar number of shields on ' + 'successive rounds.</p>' +
        '<div class=group>' +
        outcome_content(result_1, resource_img, 3) + '</div><br>',
    choices: ['space']
};

var fourth = {
    type: 'html-keyboard-response',
    stimulus: '<p>After you receive the shields from the gnome, you will be ' +
        'shown which of the two dragons from before you must actually face.' +
        '</p><p>Then, you will see how much of the dragon\'s attack the ' +
        'shields you received can protect you from.</p>' +
        '<div class=group>' +
        report_content(stakes_3, resource_imgs[3], 20, wording) + '</div><br>',
    choices: ['space']
};

var instructions_block = {
    timeline: [first, second, third, fourth],
    randomize_order: false
};
