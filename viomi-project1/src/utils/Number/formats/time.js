// numeral.js format configuration
// format : time
// author : Adam Draper : https://github.com/adamwdraper

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('format', 'time', {
        regexps: {
            format: /(:)/,
            unformat: /(:)/
        },
        format: function (value, format, roundingFunction) {
            let hours = Math.floor(value / 60 / 60);
            let minutes = Math.floor((value - (hours * 60 * 60)) / 60);
            let seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

            const numList = format.split(':');

            const isCeil = numeral._.includes(format, 'ceil');

            //是否向上取整
            if (isCeil) {
                if (seconds !== 0) {
                    seconds = 0;
                    minutes++;
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            }

            if (hours < 10) {
                hours = '0' + hours;
            }

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            if (numList.length === 2) {
                return hours + ':' + minutes;
            }
            else {
                return hours + ':' + minutes + ':' + seconds;
            }
        },
        unformat: function (string) {
            var timeArray = string.split(':'),
                seconds = 0;

            // turn hours and minutes into seconds and add them all up
            if (timeArray.length === 3) {
                // hours
                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
                // minutes
                seconds = seconds + (Number(timeArray[1]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
                // minutes
                seconds = seconds + (Number(timeArray[0]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
        }
    });
}));
