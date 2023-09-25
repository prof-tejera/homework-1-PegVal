import fetch from "node-fetch";
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

/* ------- NEW CODE A METTRE ICI ---------------- */
const fetchColors = ({ name, hex, compName, compHex }) => {
  return fetch(COLORS)
    .then((res) => res.json()) // Renvoie une promesse  avec le contenu lisible en JSON
    .then((res) => {
      console.log(
        " NAME, HEX, COMPNAME, COMPHEX : ", // renvoie le paramètre envoyé par test
        name,
        hex,
        compName,
        compHex
      );

      console.log("______________-", compName);

      // ## promise
      // then(data)=> promise
      // catch(error) => promise
      //-------
      // p().then(faire un truc)
      // .then(faire un autre truc)
      // .then(faire un autre truc)
      // .catch(console.error)

      return new Promise((resolve, reject) => {
        /* -------- START premier test --------- */
        let filteredHex = [];
        for (let i = 0; i < res.length; i++) {
          if (hex === res[i].hex) {
            filteredHex = [...filteredHex, res[i]];
            console.log("filtered Hex :", filteredHex);
            console.log("length :", filteredHex.length);
            console.log("filtered Hex :", res[i].name);
            /* - - */
            resolve({
              length: filteredHex.length,
              ...res,
            });
          }
        } // end for loop

        /* -------- END premier test --------- */
        /* -------- START deuxième  test --------- */
        // const nameCap = name.charAt(0).toUpperCase() + name.slice(1);
        // console.log("name in Cap: ", nameCap);
        // let filteredName = [];
        // for (let i = 0; i < res.length; i++) {
        //   if (nameCap === res[i].name) {
        //     filteredName = [...filteredName, res[i]];
        //     console.log("filtered Name:", filteredName);
        //     console.log("length of filtered name:", filteredName.length);
        //     console.log("HEX of filtered name:", filteredName[0].hex);
        //     console.log("HEX of Res:", res[i].hex); //res[0].hex
        //     console.log("Name:", res[i].name);
        //     //resolve();
        //     resolve({
        //       length: filteredName.length,
        //       //hex: res[0].hex,
        //       //hex: filteredName[0].hex,
        //       //name: res[0].name,
        //       ...res,
        //     });
        //   }
        // } // end for loop
        /* -------- END deuxième test --------- */
        // end 1er Promise
        // .then(() => {
        //   console.log("1er then");
        // })
        // .then(() => {
        //   console.log("2e then");
        // })
      });
    });
};

/* ------------------------------
   for hex EFDECD returns Almond (1 ms)
  ✕ for name periwinkle returns Periwinkle
  ✕ for compName White Ice returns Sea Green
  ✕ for compHex 627BA5 returns Shadow
  ✕ for compName Black returns Black and Shadow
  ✕ for compHex FFFFFF the expected 14 colors
  
  -------------------------------------- */

//throw Error("Not implemented");

// ---------------- Leave this here
export default fetchColors;
