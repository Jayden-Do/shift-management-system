// import random from "random";

const timeTables = [
    {
        _id: "66367606a136df8ed393f757",
        user: "659c4da889ae52eb473cbf60",

        week: 1,
        dateStart: "2024-01-01T00:00:00.000Z",
        dateEnd: "2024-01-07T00:00:00.000Z",
        registered_shifts: [
            "66367606a136df8ed393f758",
            "66367606a136df8ed393f759",
            "66367606a136df8ed393f75a",
            "66367606a136df8ed393f75b",
            "66367606a136df8ed393f75c",
            "66367606a136df8ed393f75d",
            "66367606a136df8ed393f75e",
            "66367606a136df8ed393f75f",
        ],
        assigned_shifts: [],
        __v: 0,
    },
    {
        _id: "6637342798ab5d2b22596018",
        user: "651c4e5f72f6044664a57fe5",

        week: 1,
        dateStart: "2024-01-01T00:00:00.000Z",
        dateEnd: "2024-01-07T00:00:00.000Z",
        registered_shifts: [
            "6637342798ab5d2b22596019",
            "6637342798ab5d2b2259601a",
            "6637342798ab5d2b2259601b",
            "6637342798ab5d2b2259601c",
            "6637342798ab5d2b2259601d",
            "6637342798ab5d2b2259601e",
            "6637342798ab5d2b2259601f",
            "6637342798ab5d2b22596020",
            "6637342798ab5d2b22596021",
        ],
        assigned_shifts: [],
        __v: 0,
    },
];

[
    { user_id: 1, shifts: [32, 41] },
    { user_id: 1, shifts: [32, 41] },
    { user_id: 1, shifts: [32, 41] },
][
    ({ user_id: 1, shifts: [32, 41] },
    { user_id: 1, shifts: [32, 41] },
    { user_id: 1, shifts: [32, 41] })
];

function initializePopulation(numIterations, timeTables, shiftRatio = 0.4) {
    const population = [];
    for (let i = 0; i < numIterations; i++) {
        const scheduleDict = {};
        for (const entry of timeTables) {
            const userId = entry.user;
            const shifts = entry.registered_shifts;
            if (shifts.length < 5) {
                return null;
            }
            if (scheduleDict[userId]) {
                scheduleDict[userId].push(...shifts);
            } else {
                scheduleDict[userId] = shifts;
            }
        }

        for (const [userId, shifts] of Object.entries(scheduleDict)) {
            const cutLength = Math.floor(shiftRatio * shifts.length);
            shuffleArray(shifts);
            scheduleDict[userId] = shifts.slice(0, cutLength);
        }

        const individual = [];
        for (const [userId, shift] of Object.entries(scheduleDict)) {
            individual.push({ user_id: userId, shifts: shift });
        }
        population.push(individual);
    }
    return population;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function calculateFitness(timeTables, individual, targetShiftRatio = 0.4, maxShifts = 20) {
    let totalAssignedShifts = 0;
    const uniqueShifts = new Set();
    let fitness = 0;

    // for (const userShifts of individual) {
    //     const userId = userShifts.user_id;
    //     const shifts = userShifts.shifts;
    //     totalAssignedShifts += shifts.length;
    //     shifts.forEach((shift) => uniqueShifts.add(shift));
    //     const userShiftRatio =
    //         shifts.length /
    //         timeTables.find((entry) => entry.user === userId).registered_shifts.length;
    //     if (Math.abs(userShiftRatio - targetShiftRatio) < 0.1) {
    //         fitness += 1;
    //     }
    // }

    const uniqueShiftsCount = uniqueShifts.size;
    fitness += uniqueShiftsCount / totalAssignedShifts;
    fitness += Math.min(1, totalAssignedShifts / maxShifts);

    return fitness;
}

function selection(population, retainPercentage) {
    const graded = population.slice().sort((a, b) => b[b.length - 1] - a[a.length - 1]);
    const retainLength = Math.floor(graded.length * retainPercentage);
    return graded.slice(0, retainLength);
}

function crossover(parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * Math.min(parent1.length, parent2.length));
    const child1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
    const child2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));
    return [child1, child2];
}

function getRandomSubset(arr, size) {
    const shuffled = arr.slice(); // Copy the array to avoid mutating the original
    let i = arr.length;
    let temp;
    let index;

    while (i--) {
        index = Math.floor((i + 1) * Math.random()); // Generate a random index
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }

    return shuffled.slice(0, size); // Return a subset of the shuffled array
}

function geneticAlgorithm(
    timeTables,
    maxShifts = 20,
    populationSize = 100,
    generations = 10,
    retainPercentage = 0.2,
    targetShiftRatio = 0.4
) {
    let population = initializePopulation(populationSize, timeTables, targetShiftRatio);
    for (const individual of population) {
        const individualFitness = calculateFitness(
            timeTables,
            individual,
            targetShiftRatio,
            maxShifts
        );
        individual.push(individualFitness);
    }

    for (let generation = 0; generation < generations; generation++) {
        const selectedIndividuals = selection(population, retainPercentage);
        const parents = selectedIndividuals.slice();
        const children = [];
        while (children.length < population.length - selectedIndividuals.length) {
            const [parent1, parent2] = getRandomSubset(selectedIndividuals, 2);
            const [child1, child2] = crossover(parent1, parent2);
            children.push(child1, child2);
        }
        population = parents.concat(children);

        // console.log("Generation:", generation + 1);
        // population.forEach((individual, i) => {
        //     console.log(
        //         `Individual ${i + 1}: ${JSON.stringify(individual.slice(0, -1))} (Fitness: ${
        //             individual[individual.length - 1]
        //         })`
        //     );
        // });
    }

    const bestIndividual = population.reduce((prev, current) =>
        prev[prev.length - 1] > current[current.length - 1] ? prev : current
    );

    return bestIndividual.slice(0, -1);
}

// const bestIndividual = geneticAlgorithm(timeTables);
// console.log("Best Individual", bestIndividual);

module.exports = geneticAlgorithm;
