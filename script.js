const ball = document.querySelector('.ball');
const goal = document.querySelector('.goal');
const shootButton = document.getElementById('shoot');
const audio = new Howl({ src: ['audio/feliz-cumple.mp3'] });

shootButton.addEventListener('click', () => {
    gsap.to(ball, {
        duration: 1,
        x: Math.random() * 50 - 25, // Movimiento horizontal aleatorio
        y: -120, // Ajuste este valor para que sea menor y coincida con la altura del arco
        onComplete: () => {
            if (checkGoal()) {
                showCelebration();
            } else {
                resetBall();
            }
        }
    });
});

function checkGoal() {
	const ballRect = ball.getBoundingClientRect();
	const goalPostRect = document.querySelector('.goal-post').getBoundingClientRect();

	return (
		ballRect.top >= goalPostRect.top &&
		ballRect.bottom <= goalPostRect.bottom &&
		ballRect.left >= goalPostRect.left &&
		ballRect.right <= goalPostRect.right
	);
}

function resetBall() {
	gsap.to(ball, { duration: 0.5, y: 0 });
}

function showCelebration() {
	document.querySelector('.game').style.display = 'none';
  
	audio.play();
	document.body.innerHTML += `
	<div class="celebration-container">
      <div class="congrats-message">
        <h1>¡Felicitaciones, ganaste la Libertadores!</h1>
		<img src="img/copa.png" alt="Copa Libertadores" class="copa">
      </div>
	  <div class="card">
		<h2>¡Feliz Cumpleaños al carbonero mas lindo del planeta!</h2>
		<p>Espero que este día sea tan espectacular como vos</p>
		<p>¡Te mando un abrazo enorme!</p>
		<p>💛 Te quiero 🖤</p>
	  </div>
	</div>
	`;
	document.body.classList.add("celebration-active");

	const celebrationContainer = document.createElement('div');
	celebrationContainer.classList.add('celebration-container');
	document.body.appendChild(celebrationContainer);

	gsap.fromTo(
		".copa",
		{ scale: 0, y: 50 },
		{ duration: 1, scale: 1, y: 0, ease: "bounce.out" }
	);
	gsap.fromTo(
		".card",
		{ opacity: 0, scale: 0.5 },
		{ duration: 1, opacity: 1, scale: 1, delay: 1 }
	);
}
