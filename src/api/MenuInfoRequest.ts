import DefaultApiRequest from "@/api/DefaultApiRequest";
import {type IMenuInfo} from "@interface/IMenuInfo";

/**
 * Menu info request
 * @class BaseMenuInfoRequest
 * @extends DefaultApiRequest<IMenuInfo>
 */
class BaseMenuInfoRequest extends DefaultApiRequest<IMenuInfo> {
  /**
   * Update message
   * @return {Promise<IMenuInfo>}
   * @param message
   */
  public async updateMessage(message: string | null): Promise<IMenuInfo> {
    return await this.update('message', message);
  }
}

const menuInfoRequest = new BaseMenuInfoRequest('/menu_info');
export default menuInfoRequest;
