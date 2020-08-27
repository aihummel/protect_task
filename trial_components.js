function init_stakes_content(stakes_a, stakes_b) {
    return '<table class=table_center><tr>' +
            '<td class=prompt colspan=3>You could encounter</td>' +
        '</tr><tr style="height: 300px;">' +
            '<td><img src=' + stakes_a + '/></td>' +
            '<td class=prompt>OR</td>' +
            '<td><img src=' + stakes_b + '/></td>' +
        '</tr></table>'
};

function decision_content(choice_a, choice_b) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=2>Choose one</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td style="width: 300px;">' +
            '<img id="left" src=' + choice_a.name + '/>' +
        '</td>' +
        '<td style="width: 300px;">' +
            '<img id="right" src=' + choice_b.name + '/>' +
        '</td>' +
      '</tr></table>'
};

function motor_content(choice, result) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=2>You visited</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td style="width: 70px;">' +
            '<img style="opacity: 0.5; zoom: 0.5;" src=' + choice + '/>' +
        '</td><td style="width: 300px;">' +
            '<img src=' + result + '/>' +
        '</td>' +
      '</tr></table>';
};

// For some reason, seems to increase separation between choice and result
// images compared to motor_content. Not sure why.
function motor_reminder_content(choice, result) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=2>Remember to press space!</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td style="width: 70px;">' +
            '<img style="opacity: 0.5; zoom: 0.5;" src=' + choice + '/>' +
        '</td><td style="width: 300px;">' +
            '<img src=' + result + '/>' +
        '</td>' +
      '</tr></table>';
};

function confidence_estimate_content(result) {
    return '<table class=table_center><tr>' +
        '<td>' +
            '<img src=' + result + '/>' +
        '</td><td class=prompt style="width: 200px;">' +
            '<p>How many shields do you think you will recieve?</p>' +
            '<p>Enter your best estimate from 0-9 using the keypad</p>' +
            '<input type="text" id="estimate"/>' +
        '</td>' +
      '</tr></table>';
};

// formatting is not as pretty as I'd like
function confidence_certainty_content() {
    return '<table class=table_center><tr>' +
        '<td class=prompt style="width: 400px;">' +
            'How sure are you that you chose the tree ' +
            'that will lead to the most shields?' +
        '</td>' +
      '</tr><tr style="height: 100px;">' +
        '<td><form>' +
                '<label for="certaintymin">Not sure</label>' +
                '<input type="button" id="certainty-0" value="0"/>' +
                '<input type="button" id="certainty-1" value="1"/>' +
                '<input type="button" id="certainty-2" value="2"/>' +
                '<input type="button" id="certainty-3" value="3"/>' +
                '<input type="button" id="certainty-4" value="4"/>' +
                '<input type="button" id="certainty-5" value="5"/>' +
                '<input type="button" id="certainty-6" value="6"/>' +
                '<label for="certaintymax">Very sure</label>' +
        '</form></td>' +
      '</tr></table>';
};

function outcome_content(result, resource, resource_count) {
    return '<table class=table_center><tr>' +
        '<td class=prompt colspan=3>You received</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td><img src=' + result + '/></td>' +
        '<td><img src=' + resource + ' style="zoom: 30%;"/></td>' +
        '<td class=prompt>x ' + resource_count + '</td>' +
      '</tr></table>';
};

function fin_stakes_content(stakes) {
    return '<table class=table_center><tr>' +
        '<td class=prompt>You encountered</td>' +
      '</tr><tr style="height: 300px;">' +
        '<td><img src=' + stakes + '/></td>' +
      '</tr></table>';
};

function report_content(stakes, resource_img, report_value, wording) {
    return '<table class=table_center><tr>' +
            '<td class=prompt colspan=2>' + wording + ' ' + report_value + '%</td>' +
        '</tr><tr style="height: 300px;">' +
            '<td><img src=' + stakes + '/></td>' +
            '<td><img style="zoom: 0.5;" src=' + resource_img + '/></td>' +
        '</tr></table>'
};

//function tradeoff_use_content(resource_img, num, block_index, block_length) {
//    return '<table class=table_center><tr>' +
//            '<td class=prompt colspan=2>(' + block_index + '/' + block_length + ') Use your' + num + ' saved ' + <img src=resource_img> + '?</td>' +
//        '</tr><tr style="height: 300px;">' +
//            '<td>No</td>' +
//            '<td>Yes</td>' +
//        '</tr></table>'
//};

//function tradeoff_save_content(resource_img, block_index, block_length) {
//    return '<table class=table_center><tr>' +
//            '<td class=prompt colspan=2>Save ' + <img src=resource_img> + ' for later? Input the number you would like to save.</td>' +
//        '</tr><tr>' +
//            '<input type="text" id="save"/>' +
//        '</tr></table>'
//};
