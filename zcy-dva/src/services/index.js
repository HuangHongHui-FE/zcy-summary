import request from "../utils/request";

export const getCinemaListServiceApi = () => {
  return request(
    "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=7493038",
    {
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16395416565231270166529","bc":"110100"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }
  );
};
