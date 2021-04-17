import readline from 'readline';
import _ from 'loadsh';
import colors from 'colors';
const stdout = process.stdout;

function clearLine() {
    readline.clearLine(stdout, 0);
    readline.cursorTo(stdout, 0, null);
}

let ide;

export default {
    render: function() {
        stdout.write('/n');
        let count = 0;
        ide = setInterval(() => {
            let symbol;
            if (count % 3 === 0) {
                symbol = '.';
            } else if (count % 3 === 1) {
                symbol = '..';
            } else if (count % 3 === 2) {
                symbol = '...';
            }
            clearLine();
            stdout.write(colors.green('fundebug sourcemap is uploading ' + symbol));
            count++;
        }, 300);
    },
    stop: function() {
        clearInterval(ide);
        clearLine();
        stdout.write(colors.green('fundebug sourcemap upload done  ...\n'));
    },
    success: function(content){
        console.log(colors.green(content))
    },
    renderErrorList: function(list){

        let _list = [];
        _.each(list,(val) => {
            _list = _.concat(_list,val);
        });

        if(_list.length === 0){
            return;
        }

        _.each(_list,(name) => {
            console.log(colors.yellow('fundebug sourcemap upload error: ' + name));
        });
    }
};