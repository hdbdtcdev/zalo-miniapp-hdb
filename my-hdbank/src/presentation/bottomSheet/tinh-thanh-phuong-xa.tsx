import { Box, Input, Text } from "zmp-ui";
import { BottomSheetBase } from "./BottomSheetBase";
import ic_search from "@/asset/icon-search.svg";
import { useMemo, useState } from "react";
import ic_location from "@/asset/icon-location.svg";
import ic_close from "@/asset/icon-close.svg";

export interface Address {
  code: string;
  id: string;
  value: string;
}
export interface Province extends Address {}
export interface Ward extends Address {
  provinceCode: string;
}
export interface FullAddress {
  addressDetail?: string;
  province?: Province;
  ward?: Ward;
}
type BottomSheetProvinceWardProps = {
  visible: boolean;
  confirmAddr: (FullAddress) => void;
  fullAddr?: FullAddress;
  maskCloseable?: boolean;
  onClose?: () => void;
};
enum AddrType {
  PROVINCE,
  WARD,
}
export const BottomSheetProvinceWard = (
  props: BottomSheetProvinceWardProps
) => {
  const { visible, confirmAddr, fullAddr, maskCloseable, onClose } = props;
  const [selectAddrType, setSelectAddrType] = useState<AddrType>(
    AddrType.PROVINCE
  );
  const [search, setSearch] = useState<string>("");
  const [ward, setWard] = useState<Ward | undefined>(fullAddr?.ward);
  const [province, setProvince] = useState<Province | undefined>(
    fullAddr?.province
  );
  const listProvince: Province[] = [
    { code: "01", id: "", value: "Hồ Chí Minh" },
    { code: "02", id: "", value: "Hà Nội" },
    { code: "03", id: "", value: "Đà Nẵng" },
    { code: "04", id: "", value: "An Giang" },
    { code: "05", id: "", value: "Đăk Lăk" },
    { code: "06", id: "", value: "Lâm Đồng" },
    { code: "07", id: "", value: "Nghệ An" },
    { code: "08", id: "", value: "Cần Thơ" },
    { code: "09", id: "", value: "Khánh Hoà" },
  ];
  const listWard: Province[] = [
    { code: "01", id: "", value: "Sài Gòn" },
    { code: "02", id: "", value: "Tân Định" },
    { code: "03", id: "", value: "Bến Thành" },
    { code: "04", id: "", value: "Cầu Ông Lãnh" },
    { code: "05", id: "", value: "Bàn Cờ" },
    { code: "06", id: "", value: "Xuân Hòa" },
    { code: "07", id: "", value: "Phú Nhuận" },
    { code: "08", id: "", value: "Đức Nhuận" },
  ];
  const removeVietnameseAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };
  const wards = useMemo(() => {
    if (search.trim() === "") return listWard ?? [];
    return (
      listWard?.filter((item) =>
        removeVietnameseAccents(item.value.trim().toLowerCase()).includes(
          search.trim().toLowerCase()
        )
      ) ?? []
    );
  }, [listWard, selectAddrType]);
  const provinces = useMemo(() => {
    if (search.trim() === "") return listProvince ?? [];
    return (
      listProvince?.filter((item) =>
        removeVietnameseAccents(item.value.trim().toLowerCase()).includes(
          search.trim().toLowerCase()
        )
      ) ?? []
    );
  }, [listProvince, selectAddrType]);
  return (
    <BottomSheetBase
      visible={visible}
      title="Địa chỉ"
      maskClosable={maskCloseable}
      onClose={onClose}
    >
      <Box>
        <Box
          flex
          flexDirection="row"
          alignItems="center"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#D2D6DB",
            padding: 8,
            paddingTop: 6,
            paddingBottom: 6,
            marginLeft: 16,
            marginRight: 16,
            marginTop: 35,
            marginBottom: 8,
          }}
        >
          <img src={ic_search} style={{ width: 20, height: 20 }}></img>
          <input
            placeholder="Tìm kiếm"
            type="text"
            value={search}
            className="focus:outline-none focus:ring-0"
            style={{
              fontSize: 14,
              fontWeight: 400,
              flexGrow: 1,
              marginLeft: 8,
            }}
            onChange={(text) => setSearch(text.target.value)}
          />
        </Box>
        {province && (
          <Box
            flex
            flexDirection="row"
            style={{
              padding: 16,
              paddingTop: 20,
              paddingBottom: 20,
              background: "#F3F4F6",
              borderBottomWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <img src={ic_location}></img>
            <Text style={{ flexGrow: 1, marginLeft: 12, marginRight: 12 }}>
              {(ward ? `${ward.value}, ` : "") + province?.value}
            </Text>
            <img
              src={ic_close}
              onClick={() => {
                setWard(undefined);
                setProvince(undefined);
                setSelectAddrType(AddrType.PROVINCE);
                setSearch("");
              }}
            ></img>
          </Box>
        )}
        <Box flex flexDirection="row" pl={4} pr={4} mt={2}>
          <Box onClick={() => setSelectAddrType(AddrType.PROVINCE)}>
            <Text
              style={{
                margin: 16,
                marginTop: 10,
                marginBottom: 10,
                fontSize: 14,
                fontWeight: 700,
                color:
                  selectAddrType === AddrType.PROVINCE ? "#DA2128" : "#9DA4AE",
              }}
            >
              Tỉnh / Thành
            </Text>
            <Box
              height={2}
              style={{
                background:
                  selectAddrType === AddrType.PROVINCE ? "#DA2128" : "none",
              }}
            />
          </Box>
          <Box
            onClick={() => {
              if (province) setSelectAddrType(AddrType.WARD);
            }}
          >
            <Text
              style={{
                margin: 16,
                marginTop: 10,
                marginBottom: 10,
                fontSize: 14,
                fontWeight: 700,
                color: selectAddrType === AddrType.WARD ? "#DA2128" : "#9DA4AE",
              }}
            >
              Phường/Xã
            </Text>
            <Box
              height={2}
              style={{
                background:
                  selectAddrType === AddrType.WARD ? "#DA2128" : "none",
              }}
            />
          </Box>
        </Box>
        <Box height={1} style={{ background: "#E5E7EB" }} />
        <Box
          pl={4}
          pr={4}
          style={{
            height: 400,
            overflowY: "auto",
          }}
        >
          {(selectAddrType === AddrType.PROVINCE ? provinces : wards).map(
            (item) => (
              <Box>
                <Box
                  flex
                  flexDirection="row"
                  alignItems="center"
                  style={{ paddingTop: 19, paddingBottom: 19 }}
                  onClick={() => {
                    if (selectAddrType === AddrType.PROVINCE) {
                      setProvince({
                        code: item.code,
                        id: item.id,
                        value: item.value,
                      });
                      setWard(undefined);
                      setSelectAddrType(AddrType.WARD);
                    } else {
                      setWard({
                        code: item.code,
                        id: item.id,
                        value: item.value,
                        provinceCode: (item as Ward).provinceCode,
                      });
                      confirmAddr({
                        ...fullAddr,
                        ward: {
                          code: item.code,
                          id: item.id,
                          value: item.value,
                          provinceCode: (item as Ward).provinceCode,
                        },
                        province: province,
                      });
                    }
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 400, flexGrow: 1 }}>
                    {item.value}
                  </Text>
                  <img
                    src="https://static-cdn.hdbank.com.vn/dibank/loan/assets/images/icons/right_arrow.png"
                    style={{ width: 8, height: 11 }}
                  />
                </Box>
                <Box height={1} style={{ background: "#E5E7EB" }} />
              </Box>
            )
          )}
        </Box>
      </Box>
    </BottomSheetBase>
  );
};
