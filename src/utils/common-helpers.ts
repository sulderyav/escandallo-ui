export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const removeProgramId = (field: string): string => {
  const purgedLoginCredential = field.substring(field.indexOf("_") + 1);
  return purgedLoginCredential;
};
import { config } from "../utils/config";

type ImageType = "award" | "logo" | "hero";

export const checkImageSize = async (file: File, type: ImageType) => {
  const { width, height } = await imageSize(file);
  const { store } = config;
  const { size } = store;

  switch (type) {
    case "award": {
      if (height !== width) {
        alert("Imagen debe ser cuadrada");
        return false;
      }
      return true;
    }
    case "logo": {
      if (height !== size.logo.height && width !== size.logo.width) {
        alert(
          `Imagen debe ser de ${size.logo.width}px x ${size.logo.height}px`
        );
        return false;
      }
      return true;
    }
    case "hero": {
      if (height !== size.hero.height && width !== size.hero.width) {
        alert(
          `Imagen debe ser de ${size.hero.width}px x ${size.hero.height}px`
        );
        return false;
      }
      return true;
    }
    default:
      return;
  }
};

function imageSize(file: File): Promise<{ width: number; height: number }> {
  const reader = new FileReader();

  //Read the contents of Image File.
  reader.readAsDataURL(file);

  const promise: Promise<{ width: number; height: number }> = new Promise(
    (resolve, reject) => {
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        const image = new Image();

        //Set the Base64 string return from FileReader as source.
        // image.src = e.target.result;
        image.src = window.URL.createObjectURL(file);

        //Validate the File Height and Width.
        image.onload = function () {
          const height = image.height;
          const width = image.width;

          resolve({ width, height });
        };
      };
    }
  );

  return promise;
}
