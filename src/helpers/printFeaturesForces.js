const Features = require("../constants/features");

const printFeaturesForces = ({ result, Classes1, Classes2 }) => {
    console.log('\nВідношення 0 і 1 двох класів:'.blue);

    console.log(Object.keys(Features).join('\t| '));

    const forces = Object.values(result)

    console.log(forces
        .map(({ classes1, classes2 }) => `${classes1}/${classes2}`)
        .join(' \t| ') + "\t| 1")

    console.log(
        forces
            .map(({ classes1, classes2 }) => {
                return `${Classes1.length - classes1}/${Classes2.length - classes2}`;
            })
            .join(' \t| ') + "\t| 0"
    )
}

module.exports = printFeaturesForces;
