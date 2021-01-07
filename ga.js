function nextGeneration() {
  console.log("Next generation");
  calculateFitness(end);

  for (let i = 0; i < TOTAL; i++) {
    population[i] = pickOne();
  }

  // Dispose używa się do zarządzania pamięcią
  for (let i = 0; i < TOTAL; i++) {
    savedParticles[i].dispose();
  }
  savedParticles = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedParticles[index].fitness;
    index++;
  }
  index--;
  let particle = savedParticles[index];
  // TODO implement copy Particle
  let child = new Particle(particle.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  for (let particle of savedParticles) {
    particle.calculateFitness();
  }

  // Normalizowanie wszystkich wartości
  let sum = 0;
  for (let particle of savedParticles) {
    sum += particle.fitness;
  }

  for (let particle of savedParticles) {
    particle.fitness = particle.fitness / sum;
  }
}
