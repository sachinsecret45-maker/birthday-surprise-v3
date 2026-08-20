"use strict";

/* =========================================
   ELEMENTS
========================================= */

const batmanVideo =
    document.getElementById("batman-video");

const startScreen =
    document.getElementById("start-screen");

const batmanScreen =
    document.getElementById("batman-screen");

const startButton =
    document.getElementById("start-btn");

const messageScreen =
    document.getElementById("message-screen");

const continueButton =
    document.getElementById("continue-btn");

const vaultScreen =
    document.getElementById("vault-screen");

const passwordInput =
    document.getElementById("password-input");

const bgMusic =
    document.getElementById("bg-music");

const musicToggleButton =
    document.getElementById("music-toggle-btn");

const unlockButton =
    document.getElementById("unlock-btn");

const vaultMessage =
    document.getElementById("vault-message");

const gameScreen =
    document.getElementById("game-screen");

const gameArea =
    document.getElementById("game-area");

const scoreDisplay =
    document.getElementById("game-score");

const cockroaches =
    document.querySelectorAll(".cockroach");


/* =========================================
   SURPRISE / WELCOME ELEMENTS
========================================= */

const unlockScreen =
    document.getElementById("unlock-screen");

const surpriseButton =
    document.getElementById("surprise-btn");

const welcomeScreen =
    document.getElementById("welcome-screen");


/* =========================================
   SNAPCHAT STORY ELEMENTS
========================================= */

const storyScreen =
    document.getElementById("story-screen");

const storyCards =
    document.querySelectorAll(".story-card");


/* =========================================
   IMPORTANT:
   YOUR HTML USES continue-journey-btn
========================================= */

const continueJourneyButton =
    document.getElementById(
        "continue-journey-btn"
    );


/* =========================================
   MEMORIES SCREEN
========================================= */

const memoriesScreen =
    document.getElementById(
        "memories-screen"
    );


/* =========================================
   SECRET CODE
========================================= */

const SECRET_CODE = "02092008";


/* =========================================
   AUDIO SYSTEM (architecture only)

   No music file exists yet in assets/music/.
   This checks — once, quietly — whether
   bg-music actually has a playable track.
   If it does not, the toggle simply stays
   hidden and nothing else in this section
   does anything. Drop a real file at
   assets/music/theme.mp3 and this becomes
   live with no further code changes.

   Defaults to muted (per the P1 acceptance
   criteria: "muted by default, with toggle").
   Playback only ever starts from the Start
   button tap — a real, deliberate user
   gesture — never on page load.
========================================= */

let musicIsAvailable =
    false;

let musicIsPlaying =
    false;


if (bgMusic && musicToggleButton) {

    bgMusic.volume =
        0.35;

    bgMusic.muted =
        true;


    bgMusic.addEventListener(
        "canplaythrough",
        () => {

            musicIsAvailable =
                true;

            musicToggleButton.classList.remove(
                "is-hidden"
            );

            musicToggleButton.classList.add(
                "is-muted"
            );

            musicToggleButton.textContent =
                "🔇";

        },
        { once: true }
    );


    bgMusic.addEventListener(
        "error",
        () => {

            /* Expected for now — no track has
               been added yet. Not a bug, so
               this stays a quiet log rather
               than a console error. */

            console.log(
                "🔈 No background track found at assets/music/ — toggle stays hidden."
            );

        },
        { once: true }
    );


    bgMusic.load();


    musicToggleButton.addEventListener(
        "click",
        () => {

            if (!musicIsAvailable) {

                return;

            }


            if (bgMusic.muted) {

                bgMusic.muted =
                    false;

                musicIsPlaying =
                    true;

                musicToggleButton.classList.remove(
                    "is-muted"
                );

                musicToggleButton.textContent =
                    "🔊";

                bgMusic.play().catch(
                    () => {}
                );

            }
            else {

                bgMusic.muted =
                    true;

                musicIsPlaying =
                    false;

                musicToggleButton.classList.add(
                    "is-muted"
                );

                musicToggleButton.textContent =
                    "🔇";

            }

        }
    );

}


function tryStartMusicFromGesture() {

    if (
        !bgMusic ||
        !musicIsAvailable
    ) {

        return;

    }


    /* Stays muted (silent) even though we
       start the <audio> element itself —
       this only "arms" playback inside the
       browser's user-gesture window. The
       music stays silent until the person
       actively taps the toggle. */

    bgMusic.play().catch(
        () => {}
    );

}


/* =========================================
   START BUTTON
========================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            startButton.textContent =
                "MISSION STARTING...";

            startButton.disabled = true;


            if (startScreen) {

                startScreen.classList.remove(
                    "active"
                );

            }


            if (batmanScreen) {

                batmanScreen.classList.add(
                    "active"
                );

            }


            if (batmanVideo) {

                batmanVideo.currentTime = 0;

                batmanVideo.play()
                    .catch((error) => {

                        console.log(
                            "Video could not play:",
                            error
                        );

                    });

            }


            /* Arm background music inside this
               same user gesture. Stays silent
               (muted) until the person taps the
               toggle — see AUDIO SYSTEM above. */

            tryStartMusicFromGesture();

        }
    );

}


/* =========================================
   BATMAN VIDEO FINISHED
========================================= */

if (batmanVideo) {

    batmanVideo.addEventListener(
        "ended",
        () => {

            console.log(
                "Batman video finished!"
            );


            if (batmanScreen) {

                batmanScreen.classList.remove(
                    "active"
                );

            }


            if (messageScreen) {

                messageScreen.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================
   CONTINUE BUTTON
========================================= */

if (continueButton) {

    continueButton.addEventListener(
        "click",
        () => {

            console.log(
                "Mission continued!"
            );


            if (messageScreen) {

                messageScreen.classList.remove(
                    "active"
                );

            }


            if (vaultScreen) {

                vaultScreen.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================
   SECRET VAULT UNLOCK
========================================= */

if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        () => {

            const enteredCode =
                passwordInput
                    ? passwordInput.value.trim()
                    : "";


            /* ---------------------------------
               CORRECT PASSWORD
            --------------------------------- */

            if (
                enteredCode ===
                SECRET_CODE
            ) {

                console.log(
                    "Access granted!"
                );


                if (vaultMessage) {

                    vaultMessage.textContent =
                        "🔓 Access Granted!";

                    vaultMessage.classList.remove(
                        "error"
                    );

                    vaultMessage.classList.add(
                        "success"
                    );

                }


                setTimeout(
                    () => {

                        if (vaultScreen) {

                            vaultScreen.classList.remove(
                                "active"
                            );

                        }


                        if (gameScreen) {

                            gameScreen.classList.add(
                                "active"
                            );

                        }


                        startCockroachMovement();

                    },
                    1000
                );

            }


           /* ---------------------------------
            WRONG PASSWORD
           --------------------------------- */

         else {

          console.log(
            "😅🔐 Wrong DOB!"
            );

    alert("Oops!🔐 un date of birth kuda theriyalaya?😜");

}

        }
    );

}


/* =========================================
   COCKROACH GAME
========================================= */

let roachAnimation = null;

let roachPositions = [];

let score = 0;

let gameCompleted = false;


/* =========================================
   START COCKROACH MOVEMENT
========================================= */

function startCockroachMovement() {

    if (!gameArea) {

        console.error(
            "❌ Game area not found!"
        );

        return;

    }


    if (roachAnimation) {

        cancelAnimationFrame(
            roachAnimation
        );

    }


    roachPositions = [];


    /* Reset game */

    score = 0;

    gameCompleted = false;


    if (scoreDisplay) {

        scoreDisplay.textContent =
            "0";

    }


    /* -----------------------------------------
       CREATE ROACH POSITIONS
    ----------------------------------------- */

    cockroaches.forEach(
        (cockroach) => {

            const width =
                gameArea.clientWidth;

            const height =
                gameArea.clientHeight;


            const normalSize = 72;

            const radioactiveSize = 82;


            const size =
                cockroach.classList.contains(
                    "radioactive-cockroach"
                )
                    ? radioactiveSize
                    : normalSize;


            const x =
                Math.random() *
                Math.max(
                    1,
                    width - size
                ) +
                size / 2;


            const y =
                Math.random() *
                Math.max(
                    1,
                    height - size
                ) +
                size / 2;


            const speed =
                0.7 +
                Math.random() * 1.5;


            const angle =
                Math.random() *
                Math.PI * 2;


            roachPositions.push({

                element:
                    cockroach,

                x:
                    x,

                y:
                    y,

                dx:
                    Math.cos(angle) *
                    speed,

                dy:
                    Math.sin(angle) *
                    speed,

                speed:
                    speed

            });

        }
    );


    animateCockroaches();

}


/* =========================================
   ANIMATE COCKROACHES
========================================= */

function animateCockroaches() {

    if (!gameArea) {

        return;

    }


    const areaWidth =
        gameArea.clientWidth;

    const areaHeight =
        gameArea.clientHeight;


    roachPositions.forEach(
        (roach) => {

            if (!roach.element) {

                return;

            }


            const size =
                roach.element.classList.contains(
                    "radioactive-cockroach"
                )
                    ? 82
                    : 72;


            /* MOVE */

            roach.x +=
                roach.dx;

            roach.y +=
                roach.dy;


            /* LEFT / RIGHT */

            if (
                roach.x <=
                    size / 2 ||
                roach.x >=
                    areaWidth -
                    size / 2
            ) {

                roach.dx *=
                    -1;

            }


            /* TOP / BOTTOM */

            if (
                roach.y <=
                    size / 2 ||
                roach.y >=
                    areaHeight -
                    size / 2
            ) {

                roach.dy *=
                    -1;

            }


            /* KEEP INSIDE */

            roach.x =
                Math.max(
                    size / 2,
                    Math.min(
                        areaWidth -
                            size / 2,
                        roach.x
                    )
                );


            roach.y =
                Math.max(
                    size / 2,
                    Math.min(
                        areaHeight -
                            size / 2,
                        roach.y
                    )
                );


            /* POSITION */

            roach.element.style.left =
                `${roach.x}px`;

            roach.element.style.top =
                `${roach.y}px`;


            /* FACE MOVEMENT */

            const direction =
                roach.dx >= 0
                    ? 1
                    : -1;


            roach.element.style.transform =
                `translate(-50%, -50%) scaleX(${direction})`;

        }
    );


    roachAnimation =
        requestAnimationFrame(
            animateCockroaches
        );

}


/* =========================================
   COCKROACH CLICK
========================================= */

cockroaches.forEach(
    (cockroach) => {

        cockroach.addEventListener(
            "click",
            () => {

                /* Already completed */

                if (gameCompleted) {

                    return;

                }


                /* Only radioactive scores */

                if (
                    !cockroach.classList.contains(
                        "radioactive-cockroach"
                    )
                ) {

                    return;

                }


                /* ADD SCORE */

                score++;


                if (scoreDisplay) {

                    scoreDisplay.textContent =
                        score;

                }


                console.log(
                    `☢️ Radioactive hit! Score: ${score}`
                );


                /* MOVE RADIOACTIVE ROACH */

                const roach =
                    roachPositions.find(
                        (item) =>
                            item.element ===
                            cockroach
                    );


                if (
                    roach &&
                    gameArea
                ) {

                    const width =
                        gameArea.clientWidth;

                    const height =
                        gameArea.clientHeight;


                    roach.x =
                        Math.random() *
                        Math.max(
                            1,
                            width - 90
                        ) +
                        45;


                    roach.y =
                        Math.random() *
                        Math.max(
                            1,
                            height - 90
                        ) +
                        45;

                }


                /* =================================
                   10 / 10 COMPLETE
                ================================= */

                if (score >= 10) {

                    gameCompleted =
                        true;


                    console.log(
                        "🎉 Surprise unlocked!"
                    );


                    /* STOP ANIMATION */

                    if (roachAnimation) {

                        cancelAnimationFrame(
                            roachAnimation
                        );

                        roachAnimation =
                            null;

                    }


                    /* HIDE GAME */

                    if (gameScreen) {

                        gameScreen.classList.remove(
                            "active"
                        );

                    }


                    /* SHOW UNLOCK SCREEN */

                    setTimeout(
                        () => {

                            if (unlockScreen) {

                                unlockScreen.classList.add(
                                    "active"
                                );

                            }

                        },
                        500
                    );

                }

            }
        );

    }
);


/* =========================================
   OPEN MY SURPRISE → WELCOME
========================================= */

if (surpriseButton) {

    surpriseButton.addEventListener(
        "click",
        () => {

            console.log(
                "💗 Entering birthday world..."
            );


            if (unlockScreen) {

                unlockScreen.classList.remove(
                    "active"
                );

            }


            if (welcomeScreen) {

                welcomeScreen.classList.add(
                    "active"
                );

            }
            else {

                console.error(
                    "❌ welcome-screen not found!"
                );

            }

        }
    );

}


/* =========================================
   WELCOME → SNAPCHAT STORY
========================================= */

const welcomeSurpriseButton =
    document.getElementById(
        "welcome-surprise-btn"
    );


if (welcomeSurpriseButton) {

    welcomeSurpriseButton.addEventListener(
        "click",
        () => {

            console.log(
                "💖 Welcome button clicked!"
            );


            if (welcomeScreen) {

                welcomeScreen.classList.remove(
                    "active"
                );

            }


            if (storyScreen) {

                storyScreen.classList.add(
                    "active"
                );

            }


            console.log(
                "📱 Snapchat Story opened!"
            );

        }
    );

}


/* =========================================
   SNAPCHAT STORY CARDS
========================================= */

storyCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                /* Close all other cards */

                storyCards.forEach(
                    (otherCard) => {

                        if (
                            otherCard !==
                            card
                        ) {

                            otherCard.classList.remove(
                                "active"
                            );

                        }

                    }
                );


                /* Open selected card */

                card.classList.toggle(
                    "active"
                );

            }
        );

    }
);


/* =========================================
   ⭐ CONTINUE THE JOURNEY
   STORY → MEMORIES

   IMPORTANT:
   HTML ID = continue-journey-btn
========================================= */

if (continueJourneyButton) {

    continueJourneyButton.addEventListener(
        "click",
        () => {

            console.log(
                "📸 Continue The Journey clicked!"
            );


            /* HIDE STORY */

            if (storyScreen) {

                storyScreen.classList.remove(
                    "active"
                );

            }


            /* SHOW MEMORIES */

            if (memoriesScreen) {

                memoriesScreen.classList.add(
                    "active"
                );

                console.log(
                    "💗 Memories screen opened!"
                );

            }
            else {

                console.error(
                    "❌ memories-screen not found!"
                );

            }


            /* Scroll to top */

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );

        }
    );

}
else {

    console.error(
        "❌ continue-journey-btn not found!"
    );

}


/* =========================================
   8 PHOTO HEART MEMORY SLIDESHOW
========================================= */

const memoryImage =
    document.getElementById(
        "memory-heart-image"
    );

const memoryTitle =
    document.getElementById(
        "memory-caption-title"
    );

const memoryText =
    document.getElementById(
        "memory-caption-text"
    );

const memoryDots =
    document.querySelectorAll(
        ".memory-dot"
    );


if (memoryImage) {


    /* =====================================
       YOUR 8 PHOTOS
    ====================================== */

    const memoryPhotos = [

        {
            image:
                "assets/images/memories/photo1.jpg",

            title:
                "Cute Memory 💕",

            text:
                "A little moment that still makes me smile whenever I see it... ❤️"
        },

        {
            image:
                "assets/images/memories/photo2.jpg",

            title:
                "Beautiful Smile ✨",

            text:
                "That smile has a way of making even an ordinary moment special. 💗"
        },

        {
            image:
                "assets/images/memories/photo3.jpg",

            title:
                "Forever Memorable 🌸",

            text:
                "One of those memories that deserves a permanent place in my heart. ❤️"
        },

        {
            image:
                "assets/images/memories/photo4.jpg",

            title:
                "Sweet Moment 🥰",

            text:
                "Just a simple picture, but somehow it became a beautiful memory. 💕"
        },

        {
            image:
                "assets/images/memories/photo5.jpg",

            title:
                "That Little Smile 💖",

            text:
                "There is something about this moment that I can never forget. ✨"
        },

        {
            image:
                "assets/images/memories/photo6.jpg",

            title:
                "Beautiful Day 🌷",

            text:
                "Another tiny chapter in a story filled with beautiful moments. 💗"
        },

        {
            image:
                "assets/images/memories/photo7.jpg",

            title:
                "One More Memory 📸",

            text:
                "Some pictures quietly become memories we want to keep forever. ❤️"
        },

        {
            image:
                "assets/images/memories/photo8.jpg",

            title:
                "Forever Special 💞",

            text:
                "And this one will always have a little special place in my heart. 💖"
        }

    ];


    let currentMemory =
        0;

    let memoryChanging =
        false;


    /* =====================================
       SHOW MEMORY
    ====================================== */

    function showMemory(index) {

        const memory =
            memoryPhotos[index];


        if (!memory) {

            return;

        }


        memoryImage.src = memory.image;
        
        if (memoryTitle) {

            memoryTitle.textContent =
                memory.title;

        }


        if (memoryText) {

            memoryText.textContent =
                memory.text;

        }


        memoryDots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );

    }


    /* =====================================
       NEXT MEMORY
    ====================================== */

    function nextMemory() {

        if (memoryChanging) {

            return;

        }


        memoryChanging =
            true;


        /* FADE OUT */

        memoryImage.classList.add(
            "memory-fade-out"
        );


        setTimeout(
            () => {

                currentMemory++;


                if (
                    currentMemory >=
                    memoryPhotos.length
                ) {

                    currentMemory =
                        0;

                }


                showMemory(
                    currentMemory
                );


                /* FADE IN */

                setTimeout(
                    () => {

                        memoryImage.classList.remove(
                            "memory-fade-out"
                        );


                        memoryChanging =
                            false;

                    },
                    80
                );

            },
            700
        );

    }


    /* INITIAL PHOTO */

    showMemory(0);


    /* AUTO CHANGE EVERY 4 SECONDS */

    setInterval(
        nextMemory,
        4000
    );

}


/* =========================================
   MEMORIES → CANDLE
========================================= */

const memoriesContinueButton =
    document.getElementById(
        "memories-continue-btn"
    );


if (memoriesContinueButton) {

    memoriesContinueButton.addEventListener(
        "click",
        () => {

            console.log(
                "🕯️ Memories completed!"
            );


            if (memoriesScreen) {

                memoriesScreen.classList.remove(
                    "active"
                );

            }


            if (candleScreen) {

                candleScreen.classList.add(
                    "active"
                );

                /* Always start the candle
                   screen fresh */

                resetCandleScreen();

                window.scrollTo(
                    {
                        top: 0,
                        behavior: "smooth"
                    }
                );

                console.log(
                    "🕯️ Candle screen opened!"
                );

            }
            else {

                console.error(
                    "❌ candle-screen not found!"
                );

            }

        }
    );

}


/* =========================================
   CANDLE SCREEN
========================================= */

const candleScreen =
    document.getElementById(
        "candle-screen"
    );

const candleCountdownEl =
    document.getElementById(
        "candle-countdown"
    );

const candleInstructionEl =
    document.getElementById(
        "candle-instruction"
    );

const blowCandleButton =
    document.getElementById(
        "blow-candle-btn"
    );

const candlesList =
    document.querySelectorAll(
        ".candle"
    );

const finalScreen =
    document.getElementById(
        "final-screen"
    );

const celebrationScreen =
    document.getElementById(
        "celebration-screen"
    );


let candleSequenceRunning =
    false;

let candleSequenceDone =
    false;

let candleTimers =
    [];

let celebrationTimerId =
    null;

let finalRevealTimers =
    [];


/* -----------------------------------------
   CLEAR ANY PENDING CANDLE TIMERS
----------------------------------------- */

function clearCandleTimers() {

    candleTimers.forEach(
        (timerId) => {

            clearTimeout(
                timerId
            );

        }
    );

    candleTimers =
        [];

}


/* -----------------------------------------
   RESET CANDLE SCREEN TO ITS INITIAL STATE
   (used every time the screen is opened)
----------------------------------------- */

function resetCandleScreen() {

    clearCandleTimers();

    candleSequenceRunning =
        false;

    candleSequenceDone =
        false;


    candlesList.forEach(
        (candle) => {

            candle.classList.remove(
                "blown-out"
            );

        }
    );


    if (candleCountdownEl) {

        candleCountdownEl.textContent =
            "3";

        candleCountdownEl.classList.remove(
            "show"
        );

    }


    if (candleInstructionEl) {

        candleInstructionEl.textContent =
            "Tap the cake and make a wish 💫";

    }


    if (blowCandleButton) {

        blowCandleButton.classList.remove(
            "is-hidden"
        );

        blowCandleButton.disabled =
            false;

    }

}


/* -----------------------------------------
   RUN THE 3 → 2 → 1 → BLOW COUNTDOWN
----------------------------------------- */

function runCandleCountdown() {

    if (
        candleSequenceRunning ||
        candleSequenceDone
    ) {

        return;

    }


    candleSequenceRunning =
        true;


    if (blowCandleButton) {

        blowCandleButton.classList.add(
            "is-hidden"
        );

        blowCandleButton.disabled =
            true;

    }


    if (candleInstructionEl) {

        candleInstructionEl.textContent =
            "Make your wish... 🌟";

    }


    const steps =
        [
            "3",
            "2",
            "1",
            "Blow! 🕯️"
        ];


    steps.forEach(
        (label, stepIndex) => {

            const timerId =
                setTimeout(
                    () => {

                        if (!candleCountdownEl) {

                            return;

                        }


                        candleCountdownEl.classList.remove(
                            "show"
                        );


                        const innerTimerId =
                            setTimeout(
                                () => {

                                    candleCountdownEl.textContent =
                                        label;

                                    candleCountdownEl.classList.add(
                                        "show"
                                    );


                                    /* Last step: blow out flames */

                                    if (
                                        stepIndex ===
                                        steps.length - 1
                                    ) {

                                        candlesList.forEach(
                                            (candle) => {

                                                candle.classList.add(
                                                    "blown-out"
                                                );

                                            }
                                        );


                                        console.log(
                                            "🕯️ Candles blown out!"
                                        );


                                        const finishTimerId =
                                            setTimeout(
                                                () => {

                                                    goToFinalScreen();

                                                },
                                                1400
                                            );


                                        candleTimers.push(
                                            finishTimerId
                                        );

                                    }

                                },
                                60
                            );


                        candleTimers.push(
                            innerTimerId
                        );

                    },
                    stepIndex * 950
                );


            candleTimers.push(
                timerId
            );

        }
    );

}


/* -----------------------------------------
   TAP CAKE / CANDLES TO START COUNTDOWN
----------------------------------------- */

if (candleScreen) {

    candleScreen.addEventListener(
        "click",
        (event) => {

            const tappedCake =
                event.target.closest(
                    ".cake-wrap"
                );

            if (
                tappedCake &&
                !candleSequenceRunning &&
                !candleSequenceDone
            ) {

                runCandleCountdown();

            }

        }
    );

}


/* -----------------------------------------
   BLOW BUTTON ALSO STARTS THE COUNTDOWN
----------------------------------------- */

if (blowCandleButton) {

    blowCandleButton.addEventListener(
        "click",
        () => {

            runCandleCountdown();

        }
    );

}


/* -----------------------------------------
   GO TO FINAL SCREEN
----------------------------------------- */

/* -----------------------------------------
   CLEAR THE PENDING CELEBRATION→FINAL TIMER
----------------------------------------- */

function clearCelebrationTimer() {

    if (celebrationTimerId) {

        clearTimeout(
            celebrationTimerId
        );

        celebrationTimerId =
            null;

    }

}


/* -----------------------------------------
   CANDLE → CELEBRATION
----------------------------------------- */

function goToCelebrationScreen() {

    clearCelebrationTimer();


    if (candleScreen) {

        candleScreen.classList.remove(
            "active"
        );

    }


    if (!celebrationScreen) {

        console.error(
            "❌ celebration-screen not found!"
        );

        /* Fail-safe: don't strand the user on
           a blank screen — go straight on. */

        goToFinalScreen();

        return;

    }


    celebrationScreen.classList.add(
        "active"
    );


    /* Force the confetti / photo-flash / glow
       animations to restart cleanly from the
       beginning on every visit, so replay
       always looks right rather than resuming
       mid-cycle. */

    const restartEls =
        celebrationScreen.querySelectorAll(
            ".celebration-confetti span, .cf-photo, .celebration-glow, .celebration-icon, .celebration-headline, .celebration-subtext"
        );

    restartEls.forEach(
        (el) => {

            el.style.animation =
                "none";

            void el.offsetHeight;

            el.style.animation =
                "";

        }
    );


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

    console.log(
        "🎉 Celebration screen opened!"
    );


    celebrationTimerId =
        setTimeout(
            () => {

                goToFinalScreen();

            },
            4200
        );

}


/* -----------------------------------------
   CLEAR PENDING FINAL MESSAGE REVEAL TIMERS
----------------------------------------- */

function clearFinalRevealTimers() {

    finalRevealTimers.forEach(
        (timerId) => {

            clearTimeout(
                timerId
            );

        }
    );

    finalRevealTimers =
        [];

}


/* -----------------------------------------
   RESET THE LETTER TO ITS UNREVEALED STATE
----------------------------------------- */

function resetFinalMessageReveal() {

    if (!finalScreen) {

        return;

    }


    clearFinalRevealTimers();


    const lines =
        finalScreen.querySelectorAll(
            ".reveal-line"
        );

    lines.forEach(
        (line) => {

            line.classList.remove(
                "revealed"
            );

        }
    );

}


/* -----------------------------------------
   REVEAL THE LETTER ONE LINE AT A TIME
----------------------------------------- */

function runFinalMessageReveal() {

    if (!finalScreen) {

        return;

    }


    const lines =
        finalScreen.querySelectorAll(
            ".reveal-line"
        );

    lines.forEach(
        (line, index) => {

            const timerId =
                setTimeout(
                    () => {

                        line.classList.add(
                            "revealed"
                        );

                    },
                    500 + index * 900
                );

            finalRevealTimers.push(
                timerId
            );

        }
    );

}


/* -----------------------------------------
   CANDLE → FINAL
----------------------------------------- */

function goToFinalScreen() {

    candleSequenceDone =
        true;

    candleSequenceRunning =
        false;


    if (candleInstructionEl) {

        candleInstructionEl.textContent =
            "Wish sent 💌";

    }


    if (candleScreen) {

        candleScreen.classList.remove(
            "active"
        );

    }


    if (celebrationScreen) {

        celebrationScreen.classList.remove(
            "active"
        );

    }


    if (finalScreen) {

        finalScreen.classList.add(
            "active"
        );

        /* The letter always starts unrevealed
           and reveals fresh — matters for
           replay, not just first visit. */

        resetFinalMessageReveal();

        runFinalMessageReveal();

        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

        console.log(
            "🎂 Final birthday message opened!"
        );

    }
    else {

        console.error(
            "❌ final-screen not found!"
        );

    }

}


/* =========================================
   FINAL MESSAGE → HOME
========================================= */

const finalHomeButton =
    document.getElementById(
        "final-home-btn"
    );


/* Extracted so the existing Home button AND the new Thanos
   gauntlet transition can both reuse the exact same
   home/reset logic instead of two competing systems. */

function returnToStartFromFinal() {

    console.log(
        "🏠 Returning home!"
    );


    /* Clear any pending celebration→final
       or letter-reveal timers so a stray
       timeout can't fire after the user
       has already left. */

    clearCelebrationTimer();

    clearFinalRevealTimers();

    clearCandleTimers();


    /* Hide every screen that could be active */

    document
        .querySelectorAll(
            ".screen.active, .birthday-screen.active"
        )
        .forEach(
            (activeScreen) => {

                activeScreen.classList.remove(
                    "active"
                );

            }
        );


    /* Reset the start button in case it was
       disabled/relabelled earlier */

    if (startButton) {

        startButton.disabled =
            false;

        startButton.textContent =
            "TAP TO BEGIN";

    }


    /* Reset the vault so it can be unlocked again */

    if (passwordInput) {

        passwordInput.value =
            "";

    }

    if (vaultMessage) {

        vaultMessage.textContent =
            "";

        vaultMessage.classList.remove(
            "success",
            "error"
        );

    }


    if (startScreen) {

        startScreen.classList.add(
            "active"
        );

    }


    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}


if (finalHomeButton) {

    finalHomeButton.addEventListener(
        "click",
        returnToStartFromFinal
    );

}


/* =========================================
   THANOS GAUNTLET → SNAP TRANSITION → HOME
========================================= */

const thanosDock =
    document.getElementById(
        "thanos-dock"
    );

const thanosGauntletButton =
    document.getElementById(
        "thanos-gauntlet-btn"
    );

let thanosTransitionStarted =
    false;

let thanosTransitionTimers =
    [];

function clearThanosTransitionTimers() {

    thanosTransitionTimers.forEach(
        (timerId) => clearTimeout(timerId)
    );

    thanosTransitionTimers =
        [];

}

if (thanosGauntletButton && thanosDock && finalScreen) {

    thanosGauntletButton.addEventListener(
        "click",
        () => {

            /* Rapid-tap protection: the transition
               may only ever run once. */

            if (thanosTransitionStarted) {

                return;

            }

            thanosTransitionStarted =
                true;

            thanosGauntletButton.disabled =
                true;

            console.log(
                "💜 Gauntlet tapped — snapping away..."
            );


            /* A) snap flash (~0.2s) */

            thanosDock.classList.add(
                "is-flashing"
            );


            const flashTimer = setTimeout(
                () => {

                    thanosDock.classList.remove(
                        "is-flashing"
                    );

                    /* B) final page fades/disintegrates
                       (~1s), particles drift from the
                       gauntlet at the same time */

                    thanosDock.classList.add(
                        "is-snapping"
                    );

                    finalScreen.classList.add(
                        "thanos-snap-out"
                    );

                },
                220
            );

            thanosTransitionTimers.push(
                flashTimer
            );


            const returnTimer = setTimeout(
                () => {

                    /* C) reuse the EXISTING home/reset
                       logic — no competing navigation
                       system. */

                    returnToStartFromFinal();

                },
                220 + 8000
            );

            thanosTransitionTimers.push(
                returnTimer
            );


            const cleanupTimer = setTimeout(
                () => {

                    /* D) settle back into a clean state
                       so the whole experience can be
                       replayed from the start. */

                    finalScreen.classList.remove(
                        "thanos-snap-out"
                    );

                    thanosDock.classList.remove(
                        "is-snapping"
                    );

                    thanosGauntletButton.disabled =
                        false;

                    thanosTransitionStarted =
                        false;

                    clearThanosTransitionTimers();

                },
                220 + 8000 + 400
            );

            thanosTransitionTimers.push(
                cleanupTimer
            );

        }
    );

}


/* =========================================
   FINAL DEBUG MESSAGE
========================================= */

console.log(
    "💖 Birthday Surprise App loaded successfully!"
);