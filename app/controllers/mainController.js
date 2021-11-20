const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // doc => https://www.npmjs.com/package/node-fetch

const cadexUrl = process.env.CADEXURL;

const mainController = {
    cloud: async (req, res) => {
      try {
        const response = await fetch(cadexUrl);
        // on teste le code HTTP
        if (response.status !== 200) {
          // si pas 200 => problème.
          // on récupère le corps de la réponse, et on le "throw" => il tombera dans le catch jsute après
          const error = await response.json();
          throw error;
        } else {
          const {cadex} = await response.json();
          res.render('../views/clouds', {
            cadex,
          });
        }
      } catch (error) {
        // et on log l'erreur en console pour plus de détails
        console.error(error);
      }
    },

    particles: async (req, res) => {
      try {
        const response = await fetch(cadexUrl);
        // on teste le code HTTP
        if (response.status !== 200) {
          // si pas 200 => problème.
          // on récupère le corps de la réponse, et on le "throw" => il tombera dans le catch jsute après
          const error = await response.json();
          throw error;
        } else {
          const {cadex} = await response.json();
          res.render('../views/particles', {
            cadex,
          });
        }
      } catch (error) {
        // et on log l'erreur en console pour plus de détails
        console.error(error);
      }
    }

    
}

    module.exports = mainController;