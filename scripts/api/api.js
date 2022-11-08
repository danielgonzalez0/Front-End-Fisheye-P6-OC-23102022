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
}
