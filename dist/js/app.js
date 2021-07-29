(function ($) {
    $.rand = (arg) => {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;
        }
    };

    $.animateEl = (el, animClass) => {
        $(el).addClass(animClass);
    };

    $.animeFirstSection = () => {
        $.animateEl('#first h1', 'fade-up')
        $.animateEl('#first p', 'fade-up')
        $.animateEl('#first .btn', 'fade-down')
    }

    $.animeSecondSection = () => {
        $('.wrapper.second').show();

        setTimeout(() => {
            $.animateEl('#second h1', 'fade-up')
            $.animateEl('#second p', 'fade-up')
            $.animateEl('#second .btn', 'fade-down')
        }, 1500);
    }

    $.animeThirdSection = () => {
        $('.wrapper.third').show();
        $('.wrapper.second').remove();
        $('#confirm-modal').modal('hide')
        anime({
            targets: '.wrapper.third .creative',
            translateY: ['-40%', '-50%'],
            opacity: [0, 1],
            easing: 'easeInOutCirc',
            delay: 1500,
            duration: 500,
        })
    }

    $.animeLastSection = () => {
        $('.wrapper.last').show();

        setTimeout(() => {
            $.animateEl('#last h1', 'fade-up')
            $.animateEl('#last p', 'fade-up')
            $.animateEl('#last .btn', 'fade-down')
        }, 1500);
    }

    $.animeVnSection = () => {
        $('.wrapper.last').hide();
        $('.wrapper.vn').show();
    }

    $.animeWaSection = () => {
        $('.wrapper.vn').hide();
        $('.wrapper.wa').show();

        setTimeout(() => {
            $.animateEl('#wa h1', 'fade-up')
            $.animateEl('#wa p', 'fade-up')
            $.animateEl('#wa .btn', 'fade-down')
        }, 1500);
    }

    $.createDiv = (text) => {
        let div = document.createElement('div');
        div.innerHTML = text;
        div.dataset.number = text;
        return div;
    }

    $.shuffle = (arr = []) => {
        let curIndex = arr.length,
            randIndex;
        while (0 !== curIndex) {
            randIndex = Math.floor(Math.random() * curIndex);
            curIndex--;
            [arr[curIndex], arr[randIndex]] = [
                arr[randIndex], arr[curIndex]
            ];
        }
        return arr;
    }

})(jQuery);

$(function () {

    $(document).ready(function () {

        let els = [],
            num = [];

        for (let i = 1; i <= 100; i++) {
            els.push($.createDiv(i));
            num.push(i)
        }
        const res = $.rand(num)

        setTimeout(() => {
            $('body').removeClass('preloader-show');
            $('.preloader').addClass('d-none');
            $('.wrapper.first').show()
        }, 2000);

        setTimeout(() => {
            $.animeFirstSection()
        }, 3500);

        anime({
            targets: '.preloader svg',
            translateY: ['70px', 0],
            easing: 'easeInOutCirc',
            duration: 300,
        })

        $("[data-paging='first']").click(function () {
            $.animateEl('.wrapper.first', 'zoomOutSlideBot');
            setTimeout(() => {
                $('.wrapper.first').remove();
                $.animeSecondSection()
            }, 1000);
        })

        $('[data-toggle="modal"]').click(function () {
            const target = $(this).data('target');
            $(target).modal('show')
        })

        $('.close').click(function () {
            $('.modal').modal('hide')
        });

        $('[data-action="confirm"]').click(function () {
            const parent = $(this).parents('.modal');
            if (parent.hasClass('first')) {
                parent.removeClass('first');
                parent.find('h3').html('Seriusan ??')
                $(this).html('Iyaaaa !')
            } else {
                $.animeThirdSection()
            }

        })

        $('.creative')
            .append(`<h3>Coba kamu cari angka ${res}</h3>`)
            .append('<div class="game-box"></div>')

        $('.game-box').append($.shuffle(els))

        $(`[data-number="${res}"]`).click(function () {
            $('.wrapper.third').fadeOut(1000);
            setTimeout(() => {
                $('.wrapper.third').hide();
                $('.wrapper.fourth').show();
            }, 1000);
            setTimeout(() => {
                $('.wrapper.fourth').find('.wrapper-svg').addClass('zin');
                $('.wrapper.fourth').find('.wrapper-svg .before').addClass('wrapper-wave');
                $('.wrapper.fourth').find('.wrapper-svg .after').addClass('wrapper-wave');
                $('.wrapper.fourth').find('.wrapper-svg').append(`
                <svg width="300" height="300" viewBox="0 -25 300 300">
                    <g stroke-linecap="round" stroke-linejoin="round" stroke="magenta" stroke-width="12"
                        fill="transparent">
                        <g class="circles">
                            <circle cx="100" cy="100" r="50" stroke-dashoffset="314" stroke-dasharray="314">
                                <animate attributeName="stroke-dashoffset" from="314" to="0" dur="1000ms" fill="freeze"
                                    begin="1000ms" />
                                <animate attributeName="fill" from="magenta" to="magenta" dur="300ms" begin="p.end"
                                    fill="freeze" />
                            </circle>
                            <circle cx="200" cy="100" r="50" stroke-dashoffset="314" stroke-dasharray="314"
                                transform="rotate(180 200 100)">
                                <animate id="c" attributeName="stroke-dashoffset" from="314" to="0" dur="1000ms"
                                    fill="freeze" begin="1000ms" />
                                <animate attributeName="fill" from="magenta" to="magenta" dur="300ms" begin="p.end"
                                    fill="freeze" />
                            </circle>
                        </g>
                        <g class="polygons">
                            <polygon points="60,130 240,130 150,220" stroke-dashoffset="450" stroke-dasharray="450">
                                <animate id="p" attributeName="stroke-dashoffset" from="450" to="0" dur="1000ms"
                                    fill="freeze" begin="c.end" />
                                <animate id="f" attributeName="fill" from="magenta" to="magenta" dur="300ms"
                                    begin="p.end" fill="freeze" />
                            </polygon>
                        </g>
                    </g>
                </svg>
                `);
                $('.wrapper.fourth').find('.wrapper-svg svg').addClass('svg-scale');
            }, 2000);

            setTimeout(() => {
                $('.wrapper.fourth').fadeOut(500);
                $('.wrapper.fifth').show();
                $('.wrapper.fifth h1').addClass('skew');
            }, 10000);

            setTimeout(() => {
                $('.wrapper.fifth h1').removeClass('skew');
                $('.wrapper.fifth h1').html('');
            }, 13500);

            setTimeout(() => {
                $('.wrapper.fifth h1').html('Ehh aku ada sesuatu nih buat kamu').addClass('skew');
                $('.wrapper.fifth button').attr('style', 'animation-delay: .5s').addClass('skew');
            }, 14000);
        })

        $('[data-action="last"]').click(function () {
            $('.wrapper.fifth').remove()
            $.animeLastSection()
        })

        $('.wrapper.last .btn').click(function () {
            $.animeVnSection()
        })

        /* TODO:
         * ADD timer (currentTime and duration)
         */

        const tracks = [{
            id: '1',
            title: 'Voice Note',
            artist: 'Indra Ranuh',
            src: '/dist/audio/voice_note.mp3',
            cover: '/dist/images/indra.jpg'
        }];
        const player = document.querySelector('.player');
        const audio = player.querySelector('.player__audio');
        const audioSource = audio.querySelector('source');
        const songPanel = player.querySelector('.song-panel');
        const songTitle = player.querySelector('.song-info__title');
        const songArtist = player.querySelector('.song-info__artist');
        const backButton = player.querySelector('.backward');
        const playButton = player.querySelector('.play');
        const forwardButton = player.querySelector('.forward');
        const spinner = player.querySelector('.spinner');
        const spinnerDisc = player.querySelector('.spinner__disc');
        const progress = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress__filled');

        let playing = false;
        let trackSwitch = false;

        const togglePlay = () => {
            // Play / pause the audio
            const method = audio.paused ? 'play' : 'pause';
            playing = audio.paused ? true : false;
            audio[method]();
        };

        const toggleSongPanel = () => {

            if (!trackSwitch) {
                // Scale the disc
                spinnerDisc.classList.toggle('scale');

                // Show / hide song panel
                songPanel.classList.toggle('playing');

                // Change button icon
                playButton.classList.toggle('playing');
            }
        };

        const startSpin = () => {
            // Start spinning the disc
            spinner.classList.add('spin');
        };

        const stopSpin = () => {
            // Stop spinning the disc
            const spin = document.querySelector('.spin');
            spin.addEventListener("animationiteration", () => {
                if (!playing) {
                    spin.style.animation = 'none';
                    spinner.classList.remove('spin');
                    spin.style.animation = '';
                }
            }, {
                once: true
            });
        };

        const handleProgress = () => {
            // Update the progress bar.
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.flexBasis = `${percent}%`;


            // Skip to next track if at the end of the song.
            if (percent === 100) {
                setTimeout(() => {
                    $.animeWaSection()
                }, 1000);
            }
        };

        const handleBackButton = () => {
            if (audio.currentTime <= 3) {
                const currentTrackId = parseInt(audioSource.dataset.trackid);
                const previousTrackId = currentTrackId === 1 ? '10' : (currentTrackId - 1).toString();
                const previousTrack = tracks.find(o => o.id === previousTrackId);
                changeTrack(previousTrack);
            } else {
                audio.currentTime = 0;
            }
        };

        const handleForwardButton = () => {
            const currentTrackId = parseInt(audioSource.dataset.trackid);
            const nextTrackId = currentTrackId === 10 ? '1' : (currentTrackId + 1).toString();
            const nextTrack = tracks.find(o => o.id === nextTrackId);
            changeTrack(nextTrack);
        };

        const changeTrack = (track) => {
            if (playing) trackSwitch = true;
            audioSource.setAttribute('src', track.src);
            audioSource.dataset.trackid = track.id;
            songTitle.innerHTML = track.title;
            songArtist.innerHTML = track.artist;
            spinnerDisc.style.backgroundImage = `url(${track.cover})`;
            audio.load();
            if (playing) {
                audio.addEventListener('canplay', () => {
                    audio.play();
                }, {
                    once: true
                });
                audio.addEventListener('play', () => {
                    trackSwitch = false;
                }, {
                    once: true
                });
            }
        };

        function scrub(e) {
            const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
            audio.currentTime = scrubTime;
        }

        audio.addEventListener('play', startSpin);
        audio.addEventListener('play', toggleSongPanel);
        audio.addEventListener('pause', stopSpin)
        audio.addEventListener('pause', toggleSongPanel);
        audio.addEventListener('timeupdate', handleProgress);

        backButton.addEventListener('click', handleBackButton);
        playButton.addEventListener('click', togglePlay);
        forwardButton.addEventListener('click', handleForwardButton);

        let mousedown = false;
        progress.addEventListener('click', scrub);
        progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progress.addEventListener('mousedown', () => mousedown = true);
        progress.addEventListener('mouseup', () => mousedown = false);

    })
});