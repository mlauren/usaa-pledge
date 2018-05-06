(function() {

    var NumCounter = function(elemSelector, config) {
        var self = this;
        var element = document.getElementById(elemSelector);
        var defaults = {
			frequency: 60
        };
        this.config = Object.assign(defaults, config);
        this.interval;
        this.currentCount = 1;
        this.elem = element;
        this.maxCount = Number(element.getAttribute('data-bind-count'));

        if (this.elem.length < 0) {
            this.elem = document.createElement('div');
            document.appendChild(this.elem);
        }

        this.callback = function() {
            var self = this;

            if (self.currentCount > self.maxCount) clearInterval(self.interval);
            else self.currentCount++;

            self.elem.innerHTML = numberFormat(self.currentCount);
        }
    }
    NumCounter.prototype.start = function() {
        var self = this;

        self.interval = setInterval((function() {
            self.callback();
        }), self.config.frequency * .5);
    }

    var ProgressBar = function(elemSelector) {
        var self = this;
        var element = document.querySelectorAll(elemSelector);
        this.elem = element;

        this.init = function() {
            this.elem.forEach(function(v,i) {
                var value = v.getAttribute('data-valuenow');
                var maxVal = v.getAttribute('data-valuemax');
                var percent = getPercent(value, maxVal);
                var attrString = 'width:' + percent + '%';
                v.setAttribute('style', attrString);
            });
        }
    }

    function numberFormat(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getPercent(num1, num2) {
        return (num1 / num2) * 100;
    }

    var DomTools = function() {
        var self = this;
        this.elem = document.getElementById('leaderboard');
        this.rect = this.elem.getBoundingClientRect();
        this.numCounter = new NumCounter('pledge-count', {frequency: 1});;
        this.progressBar = new ProgressBar('.progress-bar');

        this.start = function() {
            this.bottom = (window.pageYOffset || document.scrollTop);
            if (this.bottom >= this.rect.bottom) {
                this.numCounter.start();
                this.progressBar.init();
                // cancel listener
                window.removeEventListener('scroll', this.init, false );
            }
        }
    }

    window.addEventListener('DOMContentLoaded', function() {
        var domTools = new DomTools;

        window.addEventListener('scroll', domTools.start(), false);

    });
    
})();
   

