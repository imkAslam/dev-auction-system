import * as bcrypt from 'bcrypt';

export class Utils {
  /**
   *this method encode the password using bcrypt library
   * @param password user password provided as string
   * @returns
   */
  public async encodePassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  /**
   *this method match the password using bcrypt library
   * @param password user password provided as string
   * @param userPassword encrypted password stored in database
   * @returns
   */
  public async decodePassword(password: string, userPassword: string) {
    const compare = bcrypt.compareSync(password, userPassword);
    return compare;
  }

  /**
   * this method will paginate the data
   * @param data array of data with array indexes
   * @param page number of page to paginate
   * @param limit number of items to show per page
   * @returns array of paginated data along with metadata
   */
  public paginateResponse(data: any, page?: number, limit?: number) {
    const [result, total] = data;
    const totalPages = Math.ceil(total / limit);
    // const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > totalPages ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: [...result],
      metaInfo: {
        totalRecords: total,
        itemsPerPage: result.length,
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        totalPages: totalPages,
      },
    };
  }
}
