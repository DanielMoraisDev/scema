import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pt/zod.json";

i18next.init({
  lng: "pt",
  fallbackLng: "pt", // Boa prática adicionar fallback
  resources: {
    pt: { zod: translation },
  },
});

// Se zodI18nMap vier como um objeto de módulo, pegamos a função
z.setErrorMap(zodI18nMap);

export { z };
