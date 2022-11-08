/**
 * return API url
 * @param {string} url: API url
 */
class Api {
  constructor(url) {
    this._url = url;
  }
  /**
   * get data from an API
   */
  async getData() {
    return (
      fetch(this._url)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        }) //end pomise then
        .then((res) => res)
        //end promise then
        .catch(function (error) {
          console.log(`erreur: ${error}`);
        })
    ); // end catch
  }
}
/**
 * return API url
 * @param {string} url: API url
 */
class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }
  /**
   * get all photographers information data
   */
  async getPhotographers() {
    const data = await this.getData();
    return data.photographers;
  }
  /**
   * get all photographers medias data
   */
  async getMedias() {
    const data = await this.getData();
    return data.media;
  }
/**
 * return data from one specific photograh
 * @param {string} id of a photograph
 * @returns 
 */
  async getOnePhotographerProfil(id) {
    const data = await this.getData();
    const userArray = data.photographers;
    const userData= userArray.filter((data) => {
      return data.id === parseInt(id);
    });
    return userData;
  }

/**
 * return medias from one specific photograh
 * @param {string} id of a photograph
 * @returns 
 */
  async getOnePhotographerMedias(id) {
    const data = await this.getData();
    const userArray = data.media;
    const userMediaData= userArray.filter((data) => {
      return data.photographerId === parseInt(id);
    });
    return userMediaData;
  }
}