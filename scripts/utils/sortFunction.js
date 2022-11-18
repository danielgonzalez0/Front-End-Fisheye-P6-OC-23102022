/**
 * sort the medias array order by a specific type parameter
 * @param {array} array of all medias from a photographer
 * @param {string} type of the sort function: popularity, title, date
 */
export async function sorter(array, type) {
  switch (type) {
    case 'popularity':
      array.sort(function (a, b) {
        return b._likes - a._likes;
      });
      break;
    case 'date':
      array.sort(function (a, b) {
        return new Date(b._date).getTime() - new Date(a._date).getTime();
      });
      break;
    case 'title':
      array.sort(function (a, b) {
        let x = a._title.toLowerCase();
        let y = b._title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      break;
    default:
      array.sort(function (a, b) {
        return new Date(b._date).getTime() - new Date(a._date).getTime();
      });
      break;
  }
}
