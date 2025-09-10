declare namespace Api {
  interface Response<T = any> {
    code: number;
    data: T;
    msg: string;
  }

  namespace Request {
    interface Page {
      page?: number;
      size?: number;
    }

    interface SignParams {
      phone: string;
      code?: string;
      password?: string;
    }

    interface StorePage extends Page {
      status?: number;
      keyword?: string;
    }

    interface Inspection {
      pageSize: number;
      pageNo: number;
      userPhone: string;
    }
  }

  namespace Response {
    interface StoreItem {
      _id: string;
      key: string;
      name: string;
      contact: string;
      human: boolean;
      status: number;
      address: string;
      cscId: string;
      isRegistrationStore: boolean;
      allowRegularCustomers: boolean;
      riderPickupEnabled: boolean;
      nohumanFeeLimit: number;
      nohumanFee: number;
      mobileFee: number;
      emergencyContact: string[];
      isValidAddress: boolean;
      isTakeawayShelfLight: boolean;
      isMedicineIndustry: boolean;
      showOutOrderMenu: boolean;
      showProductAndInventoryMenu: boolean;
      isAuthorizationStore: boolean;
      extStore: number;
      extBrandNo: string;
      eshop: boolean;
      hasIncentive: boolean;
      useLightBar: boolean;
    }

    interface HomeStatistics {
      paidTotal: string;
      nonhumanTotal: string;
      paidCount: number;
      nonhumanCount: number;
    }

    interface CurrentUser {
      authorizationPhones: string[];
      createdAt: string;
      key: string;
      nickname: string;
      phone: string;
      prepaidAccountState: number;
      prepaidMyAccountNo: string;
      withdrawConfig: {
        alipay: {
          account: string;
          avatar: string;
          enabled: boolean;
          mobile: string;
          nickName: string;
        };
      };
    }

    interface ReturnInfo {
      doctorCount: number;
      examiningPartyCount: number;
      human: boolean;
      isMedicine: boolean;
      lightBarDevice: {};
      noShelfLightCount: number;
      onlineStatus: number;
      storeType: number;
      useCustomizeCategory: boolean;
      useShelfLight: boolean;
    }

    interface InternalGoods {
      _id: string;
      barCode: string;
      id: number;
      isBuildFile: boolean;
      isDeleteBtn: number;
      name: string;
      num: number;
      purPrice: number;
      salePrice: number;
      storeKey: string;
    }
  }
}
