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
    }

    interface HomeStatistics {
      paidTotal: string;
      nonhumanTotal: string;
      paidCount: number;
      nonhumanCount: number;
    }
  }
}
