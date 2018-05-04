
(function() {

    var NumCounter = function(elemSelector, config) {
        var self = this;
        var element = document.querySelectorAll(elemSelector);
        var defaults = {
			frequency: 60
        };
        this.config = Object.assign(defaults, config);
        this.currentItem = 0;
        this.currentCount = 0;
        this.elem = element;
        this.start = function (callback) {
            var self = this;
            this.interval = setInterval((function() {
                self.currentCount++;
                callback();
            }), self.config.frequency * .5);
        }

        this.elem.forEach(function(v,i) {            
            var nodeAttr = v.getAttribute('data-bind-count');

            self.start(function() {
                var el = this;
                if (self.currentCount > nodeAttr) clearInterval(self.interval);
                v.innerHTML = numberFormat(self.currentCount);
            });
        });
    }

    var ProgressBar = function(elemSelector) {
        var self = this;
        var element = document.querySelectorAll(elemSelector);

        this.currentItem = 0;
        this.currentCount = 0;
        this.elem = element;


        this.elem.forEach(function(v,i) {  
            var value = v.getAttribute('data-valuenow');
            var maxVal = v.getAttribute('data-valuemax');
            var percent = getPercent(value, maxVal);
            var attrString = 'width:' + percent + '%';
            v.setAttribute('style', attrString);
        });
    }

    function numberFormat(num) {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function getPercent(num1, num2) {
        return (num1 / num2) * 100;
    }


    window.addEventListener('scroll', function(e) {
        var elem = document.getElementById('leaderboard');
        var rect = elem.getBoundingClientRect();
        var bottom = (window.pageYOffset || document.scrollTop);

        if (window.pageYOffset > rect.bottom) {
            var numCounter = new NumCounter('.pledge-count', {frequency: 1});
            var progressBar = new ProgressBar('.progress-bar');
        }

    });
})();
   

