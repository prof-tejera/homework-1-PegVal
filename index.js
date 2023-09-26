import fetch from "node-fetch";

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

const fetchColors = ({ name, hex, compName, compHex }) => {
  return fetch(COLORS)
    .then((res) => res.json()) // Renvoie une promesse  avec le contenu lisible en JSON
    .then((res) => {
      //
      let filteredColors = [];

      res.forEach((elem) => {
        const lengthComp = elem.comp.length; // Nombre d'élements dans le JSON comp : 3

        // First Test : EFDECD  Almond
        if (hex) {
          filteredColors = res.filter(function (f) {
            // hex = hex du résultat <-> f.hex = tous les Hex
            if (f.hex === hex) {
              return filteredColors;
            }
          });

          // Second Test C5D0E6 Periwinkle
        } else if (name) {
          filteredColors = res.filter(function (f) {
            // name = name du résultat <-> f.name = tous les name
            if (f.name.toLowerCase().includes(name.toLowerCase())) {
              return filteredColors;
            }
          });

          // Third Test White Ice > Sea Green + Black > Black and Shadow
        } else if (compName) {
          filteredColors = res.filter(function (f) {
            for (let i = 0; i < lengthComp; i++) {
              if (
                f.comp[i].name.toLowerCase().includes(compName.toLowerCase())
              ) {
                return filteredColors;
              }
            }
          });
          //

          // Fourth test
        } else if (compHex) {
          filteredColors = res.filter(function (f) {
            for (let i = 0; i < lengthComp; i++) {
              if (f.comp[i].hex === compHex) {
                return filteredColors;
              }
            }
          });
        }
      }); // end ForEach

      return filteredColors;
    });
};
//

export default fetchColors;
