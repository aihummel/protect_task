jsPsych.plugins['no-tradeoff'] = (function() {

    var plugin = {};

    plugin.info = {
        name: 'no-tradeoff',
        description: 'task with no tradeoff',
        parameters: {
            type: {
                type: jsPsych.plugins.parameterType.STRING,
                default: 'normal',
                description: 'practice or normal block'
            },
            trial_no: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'custom trial index for updating progress bar'
            },
            stakes: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'level of stakes, 1-4'
            },
            choices_id: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'choices configuration, 0-3'
            },
            protection_a: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'number of shields from gnome a, init 0-4'
            },
            protection_b: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'number of shields from gnome b, init 5-9'
            },
            confidence_type: {
                type: jsPsych.plugins.parameterType.STRING,
                default: null,
                description: 'type of survey: estimate or certainty or none'
            },
            init_stakes_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2500,
                description: 'milliseconds pair of potential stakes values shown'
            },
            choice_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 3000,
                description: 'milliseconds pair of choices shown'
            },
            motor_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 3000,
                description: 'milliseconds subject has to press space to see outcome'
            },
            confidence_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 3500,
                description: 'milliseconds subject has to answer survey'
            },
            outcome_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2000,
                description: 'milliseconds outcome shown'
            },
            fin_stakes_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2000,
                description: 'milliseconds actual stakes shown'
            },
            report_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 2000,
                description: 'milliseconds final trial result shown'
            },
            iti_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: 1000,
                description: 'milliseconds of iti between trials'
            }
        }
    }

    plugin.trial = function(display_element, trial) {
        document.body.style.backgroundColor = '#777';  // dark bg color
        display_element.style.backgroundColor = 'white';

        var setTimeoutHandlers = [];
        var keyboardListener = new Object;
        var choice_selected;
        var result;
        var outcome;

        var response = {
            rt: null,
            key: null,
            certainty: null,
            estimate: null
        };

        var responses = {
            rt: [],
            key: []
        };

		jsPsych.pluginAPI.clearAllTimeouts();
		jsPsych.pluginAPI.cancelAllKeyboardResponses();

        var end_trial = function() {
            var trial_data = {
                "stimulus": trial.stimuli,
                "duration": trial.trial_duration,
                "choice_selected" : choice_selected,
                "rts": responses.rt,
                "keys": responses.key,
                "certainty": responses.certainty,
                "estimate": responses.estimate
            };

            jsPsych.finishTrial(trial_data);
        }

        var after_response = function(info) {
            if (response.key == null) {
                let character = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key);
                if (['space', 'f', 'j'].indexOf(character) > -1) {
                    response = info;
                    if (character == 'f') {
                        choice_selected = choices_types[trial.choices_id].choice_a.name;
                        display_element.querySelector('#left').className += ' responded';
                    }
                    else if (character == 'j') {
                        choice_selected = choices_types[trial.choices_id].choice_b.name;
                        display_element.querySelector('#right').className += ' responded';
                    }
                    else if (display_element.querySelector('#motor') &&
                            character == 'space') { // offset from motor
                        stages(4);
                    }
                }
                else if (display_element.querySelector('#estimate') &&
                        character == 'enter') {
                    response.estimate = display_element.querySelector('#estimate').value;
                    stages(5);
                }
            }
            responses.rt.push(info.rt);
            responses.key.push(info.key);
        }

        var start_response_listener = function(choices) {
            response.key = null;
			if(JSON.stringify(choices) != JSON.stringify(["none"])) {
				var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
					callback_function: after_response,
					valid_responses: choices,
					rt_method: 'performance',
					persist: false,
					allow_held_key: false,
				})
			}
		}

        var after_certainty_response = function(e) {
            response.certainty = e.currentTarget.getAttribute('value');
            console.log(response.certainty);
            stages(3);
        }

        var start_certainty_listener = function() {
            for (let i = 0; i <= 6; i++) {
                display_element.querySelector('#certainty-' + i).addEventListener('click', after_certainty_response);
            }
        }

        // This is the function that show each part of the trial in order
        // the part shown is determined by the stage number (and things like
        // whether a choice was selected). Because of the branching, the stage
        // numbers are a bit wonky in places.
        var stages = function(stage) {
            jsPsych.pluginAPI.clearAllTimeouts();
    		jsPsych.pluginAPI.cancelAllKeyboardResponses();
            display_element.innerHTML = '';

            let delay;

            if (stage == 0) { // init stakes
                let stakes_a = stakes_1;
                let stakes_b = stakes_2;
                if (trial.stakes > 2) {
                    stakes_a = stakes_3;
                    stakes_b = stakes_4;
                }

                display_element.innerHTML = '<div class=bg>' + init_stakes_content(stakes_a, stakes_b) + '</div>';

                delay = trial.init_stakes_duration;
            }
            else if (stage == 1) { // choice
                let choice_a = choices_types[trial.choices_id].choice_a;
                let choice_b = choices_types[trial.choices_id].choice_b;

                display_element.innerHTML = '<div class=bg>' + decision_content(choice_a, choice_b) + '</div>';
                start_response_listener(['f', 'j']);

                delay = trial.choice_duration;
            }
            else if (choice_selected == null) { // did not make choice
                if (stage == 2) { // outcome
                    outcome = 0;
                    display_element.innerHTML =
                        '<div class="bg prompt" id="motor">' +
                        'You did not select a tree in time,<br>' +
                        'so you received no shields!<br><br>' +
                        'Please press space.</div>';

                    start_response_listener(['space']);
                    return;
                }
                else if (stage == 4) { // fin stakes
                    display_element.innerHTML = '<div class=bg>' + fin_stakes_content(stakes_types[trial.stakes - 1].stakes) + '</div>';

                    delay = trial.fin_stakes_duration;
                }
                else if (stage == 5) { // iti
                    display_element.innerHTML = '<div class=bg style="font-size: 60px;">+</div>';
                    delay = trial.iti_duration;
                }
                else {
                    end_trial();
                    return;
                }
            }
            else if (stage < 6) {  // made choice
                if (trial.confidence_type == 'estimate') {
                    if (stage == 2) { // motor
                        result = get_result(choice_selected);

                        display_element.innerHTML = '<div class=bg id="motor">' + motor_content(choice_selected, result) + '</div>';

                        start_response_listener(['space']);
                        delay = trial.motor_duration;
                        jsPsych.pluginAPI.setTimeout(function() {stages(stage + 0.5);}, delay);
                        return;
                    }
                    else if (stage == 2.5) { // motor reminder
                        display_element.innerHTML = '<div class=bg id="motor">' + motor_reminder_content(choice_selected, result) + '</div>';
                        start_response_listener(['space']);
                        return;
                    }
                    if (stage == 4) { // confidence: estimate
                        display_element.innerHTML = '<div class=bg>' + confidence_estimate_content(result) + '</div>';

                        start_response_listener(['enter']);
                        return;
                    }
                    else if (stage == 5) { // outcome
                        if (result === result_1) outcome = trial.protection_a;
                        else if (result === result_2) outcome = trial.protection_b;

                        display_element.innerHTML = '<div class=bg>' + outcome_content(result, resource_img, outcome) + '</div>';

                        delay = trial.outcome_duration;
                    }
                }
                else if (trial.confidence_type == 'certainty') {
                    if (stage == 2) { // confidence: certainty
                        display_element.innerHTML = '<div class=bg>' + confidence_certainty_content() + '</div>';

                        start_certainty_listener();
                        return;
                    }
                    if (stage == 3) { // motor
                        result = get_result(choice_selected);

                        display_element.innerHTML = '<div class=bg id="motor">' + motor_content(choice_selected, result) + '</div>';

                        start_response_listener(['space']);
                        delay = trial.motor_duration;
                        jsPsych.pluginAPI.setTimeout(function() {stages(stage + 0.5);}, delay);
                        return;
                    }
                    else if (stage == 3.5) { // motor reminder
                        display_element.innerHTML = '<div class=bg id="motor">' + motor_reminder_content(choice_selected, result) + '</div>';
                        start_response_listener(['space']);
                        return;
                    }
                    else if (stage == 4) { // outcome
                        if (result === result_1) outcome = trial.protection_a;
                        else if (result === result_2) outcome = trial.protection_b;

                        display_element.innerHTML = '<div class=bg>' + outcome_content(result, resource_img, outcome) + '</div>';

                        delay = trial.outcome_duration;
                        stage++;
                    }
                }
                else {
                    if (stage == 2) { // motor
                        result = get_result(choice_selected);

                        display_element.innerHTML = '<div class=bg id="motor">' + motor_content(choice_selected, result) + '</div>';

                        start_response_listener(['space']);
                        delay = trial.motor_duration;
                        jsPsych.pluginAPI.setTimeout(function() {stages(stage + 0.5);}, delay);
                        return;
                    }
                    else if (stage == 2.5) { // motor reminder
                        display_element.innerHTML = '<div class=bg id="motor">' + motor_reminder_content(choice_selected, result) + '</div>';
                        start_response_listener(['space']);
                        return;
                    }
                    else if (stage == 4) { // outcome
                        if (result === result_1) outcome = trial.protection_a;
                        else if (result === result_2) outcome = trial.protection_b;

                        display_element.innerHTML = '<div class=bg>' + outcome_content(result, resource_img, outcome) + '</div>';

                        delay = trial.outcome_duration;
                        stage++;
                    }
                }
            }
            else { // made choice
                if (stage == 6) { // fin stakes
                    display_element.innerHTML = '<div class=bg>' + fin_stakes_content(stakes_types[trial.stakes - 1].stakes) + '</div>';

                    delay = trial.fin_stakes_duration;
                }
                else if (stage == 7 && outcome != 0) { // report
                    let shielded = shield_shock(outcome, trial.stakes);
                    let pct = Math.floor(100 * Math.min((trial.stakes + shielded) / trial.stakes, 1));

                    display_element.innerHTML = '<div class=bg>' + report_content(stakes_types[trial.stakes - 1].stakes, resource_imgs[outcome], pct, wording) + '</div>';

                    delay = trial.report_duration;
                }
                else if (stage == 8) { // iti
                    display_element.innerHTML = '<div class=bg style="font-size: 60px;">+</div>';
                    delay = trial.iti_duration;
                }
                else {
                    console.log(response, responses);

                    jsPsych.setProgressBar(trial.trial_no / n_trials);

                    end_trial();
                    return;
                }
            }

            jsPsych.pluginAPI.setTimeout(function() {stages(stage + 1);}, delay);
        }

        stages(0);
    }

    return plugin;

})();
