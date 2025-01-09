// 用户角色

const Code = {
  // 01 采购单位
  purchaser: "01",
  // 02 供应商
  supplier: "02",
  // 03 代理机构
  agency: "03",
  // 0301 集采机构
  centralizedAgency: "0301",
  // 0302 社会中介
  socialAgency: "0302",
  // 030301 公共资源交易中心
  publicTradingCenterAgency: "030301",
  // 04 专家
  expert: "04",
  // 05 政采个人角色
  personal: "05",
  // 06 采购监管 (在政采业务中是财政部门，在企采业务中是国资委)
  supervisor: "06",
  // 99 平台运营
  admin: "99",
};

class UserIdentity {
  get categoryName(): string {
    return (window as any)?.currentUserIdentity?.categoryName || "";
  }

  // 采购单位
  get isPurchaser() {
    return this.categoryName.startsWith(Code.purchaser);
  }

  // 供应商
  get isSupplier() {
    return this.categoryName.startsWith(Code.supplier);
  }

  // 代理机构
  get isAgency() {
    return this.categoryName.startsWith(Code.agency);
  }

  // 集采机构
  get isCentralizedAgency() {
    return this.categoryName.startsWith(Code.centralizedAgency);
  }

  // 社会中介
  get isSocialAgency() {
    return this.categoryName.startsWith(Code.socialAgency);
  }

  // 公共资源交易中心
  get isPublicTradingCenterAgency() {
    return this.categoryName.startsWith(Code.publicTradingCenterAgency);
  }

  // 专家
  get isExpert() {
    return this.categoryName.startsWith(Code.expert);
  }

  // 政采个人角色
  get isPersonal() {
    return this.categoryName.startsWith(Code.personal);
  }

  // 采购监管 (在政采业务中是财政部门，在企采业务中是国资委)
  get isSupervisor() {
    return this.categoryName.startsWith(Code.supervisor);
  }

  // 平台运营
  get isAdmin() {
    return this.categoryName.startsWith(Code.admin);
  }
}

const userIdentity = new UserIdentity();

export default userIdentity;

// 1、使用
import userIdentity from "xxx";
userIdentity.isPurchaser;
