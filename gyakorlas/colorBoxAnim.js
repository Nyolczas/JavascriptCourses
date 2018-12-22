window.onload = function () {
    var cnt = 0;
    var posLft = 0;
    var posTop = 0;
    var clrCnt = 1;
    var round = 0;
    var contRound = 0;


    //our box element
    var box = document.getElementById('box');
    var container = document.getElementById('container');
    var body = document.getElementById('body');
    var t = setInterval(move, 10);

    // ======================= color clock =======================
    // hsl színek beállítása

    function move() {
        class colorClock {

            get dark() {
                return this.darkColor();
            }

            get light() {
                return this.lightColor();
            }

            get full() {
                return this.fullColor();
            }

            darkColor() {
                return 'hsl(' + counter() + ', 80%, 20%)';
            }

            lightColor() {
                return 'hsl(' + counter() + ', 100%, 94%)';
            }

            fullColor() {
                return 'hsl(' + counter() + ', 100%, 50%)';
            }
        }

        function counter() {
            if (clrCnt == 360) {
                clrCnt = 1;
            } else {
                clrCnt += 1;
            }
            return clrCnt;
        }

        clr = new colorClock();


        if (cnt >= 300) {
            clearInterval(t);
        } else {
            cnt += 1;

            box.style.backgroundColor = clr.full;
            container.style.backgroundColor = clr.dark;
            body.style.backgroundColor = clr.light;

            if (cnt < 113) {
                round += 0.22;
            } else {
                round -= 0.22;
            }
            box.style.borderRadius = round + 'px';

            if (cnt <= 75 || cnt > 225) {
                posLft += 2;
                box.style.left = posLft + 'px';
            } else if (cnt > 75 && cnt <= 225) {
                posLft -= 1;
                posTop += 1;
                box.style.left = posLft + 'px';
                box.style.top = posTop + 'px';
                var r = 4.3;
                if (cnt < 150) {
                    contRound += r
                } else {
                    contRound -= r;
                }
                container.style.borderRadius = contRound + 'px';
            }
        }
    }
};