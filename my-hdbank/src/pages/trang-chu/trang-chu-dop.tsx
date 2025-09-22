import { useEffect, useState } from "react";
import "zmp-ui/zaui.css";
import {
    ZMPRouter,
    AnimationRoutes,
    Page,
    Header,
    Box,
} from "zmp-ui";
import { Route } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { Swiper } from "zmp-ui";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import { fetchCardListAvailable } from "../../presentation/pages/card/thunk";
import { CardDOPBaseRequest, CardDOPBaseResponse } from "@/domain/entities/common/cardDOPBaseApi";
import { CardListAvailableDataReq, CardListAvailableDataRes } from "@/domain/entities/cardListAvailable";
import { useDispatch } from "@/lib/redux";

export default function CreditCardIssueScreen() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('--- NamPH7 ------')
        dispatch(fetchCardListAvailable({} as CardDOPBaseRequest<CardListAvailableDataReq>['data']))
                .then((res) => {
                    const resp = res.payload as CardDOPBaseResponse<CardListAvailableDataRes>;
                    if (resp?.resultCode !== '00') {
                        console.log('--- NamPH7 ------00', JSON.stringify(resp?.resultMessage))
                    }
                })
                .catch((e) => {
                    console.log('--- NamPH7 ------err')
                })

    }, [])

    const products = [
        {
            id: "vietjet-platinum",
            name: "HDBank Vietjet Platinum",
            perks: [
                { title: "0 phí thường niên trọn đời", desc: "Không kèm bất kỳ điều kiện nào." },
                { title: "Miễn lãi đến 45 ngày", desc: "Hạn mức sẵn sàng. Mua trước, trả sau." },
                { title: "Cần là có, đăng ký siêu dễ!", desc: "Mở thẻ online, không cần chứng minh thu nhập." },
            ],
        },
        {
            id: "classic",
            name: "HDBank Classic",
            perks: [
                { title: "Hoàn tiền theo chi tiêu", desc: "Ưu đãi theo từng hạng mục chi tiêu." },
                { title: "Ân hạn lãi 45 ngày", desc: "Quản lý dòng tiền linh hoạt." },
                { title: "Đăng ký online nhanh", desc: "Xét duyệt tự động trong vài phút." },
            ],
        },
    ];

    const [active, setActive] = useState(0);

    return (
        <ZMPRouter>
            <AnimationRoutes>
                <Route
                    path="/"
                    element={
                        <Page style={{ background: "transparent" }}>
                            <Header
                                backIcon={<MoveLeft color="#fff" />}
                                title="Phát hành thẻ tín dụng"
                                className="transparent-header"
                                style={{ background: "transparent", boxShadow: "none", borderBottom: "none", color: "#fff" }}
                            />

                            {/* chừa khoảng trống cho Header */}
                            <div style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 56px)" }}>
                                <Box style={{ padding: 16, marginTop: 16 }}>
                                    {/* Title */}
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            fontSize: 24,
                                            lineHeight: 1.3,
                                            marginBottom: 24,
                                            color: "#111",
                                        }}
                                    >
                                        Vui lòng chọn thẻ tín dụng HDBank phù hợp với nhu cầu của Quý khách
                                    </div>

                                    {/* Swiper với ảnh nổi */}
                                    <Swiper
                                        style={{ paddingBottom: 36, overflow: "visible" }}
                                    >
                                        {products.map((p) => (
                                            <SwiperSlide key={p.id} style={{ overflow: "visible" }}>
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        maxWidth: 520,
                                                        margin: "0 auto",
                                                        position: "relative",
                                                        paddingTop: 88, // chỗ đặt ảnh nổi
                                                        overflow: "visible",
                                                    }}
                                                >
                                                    {/* Ảnh thẻ nổi */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            left: "5%",
                                                            right: "5%",
                                                            top: 0,
                                                            height: 160,
                                                            borderRadius: 12,
                                                            overflow: "hidden",
                                                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                                            background:
                                                                "linear-gradient(135deg, #FFD166, #FF9F1C, #FCA311)",
                                                            zIndex: 2,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "90%",
                                                                height: "75%",
                                                                margin: "auto",
                                                                marginTop: 20,
                                                                borderRadius: 10,
                                                                background: "rgba(0,0,0,0.85)",
                                                                color: "#fff",
                                                                padding: 12,
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                justifyContent: "space-between",
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.9 }}>
                                                                <strong>HDBank</strong>
                                                                <strong>Vietjet Air</strong>
                                                            </div>
                                                            <div style={{ textAlign: "right", opacity: 0.8 }}>VISA Platinum</div>
                                                        </div>
                                                    </div>

                                                    {/* Card trắng bên dưới (không dùng top âm) */}
                                                    <div
                                                        style={{
                                                            position: "relative",
                                                            background: "#fff",
                                                            borderRadius: 16,
                                                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                                            padding: 16,
                                                            paddingTop: 106, // khoảng trống trong card
                                                            zIndex: 1,
                                                            overflow: "visible",
                                                        }}
                                                    >
                                                        {/* Tên sản phẩm */}
                                                        <div
                                                            style={{
                                                                color: "#c92a2a",
                                                                fontWeight: 800,
                                                                fontSize: 18,
                                                                marginBottom: 16,
                                                            }}
                                                        >
                                                            {p.name}
                                                        </div>

                                                        {/* Perks */}
                                                        <div style={{ display: "grid", rowGap: 28 }}>
                                                            {p.perks.map((k, i) => (
                                                                <div key={i} style={{ display: "flex", gap: 22 }}>
                                                                    <div
                                                                        style={{
                                                                            width: 28,
                                                                            height: 28,
                                                                            borderRadius: 999,
                                                                            background: "linear-gradient(135deg,#ff6a00,#ffb347)",
                                                                            flexShrink: 0,
                                                                        }}
                                                                    />
                                                                    <div>
                                                                        <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>{k.title}</div>
                                                                        <div style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.2 }}>{k.desc}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* CTA sticky đáy: đỏ → vàng */}
                                    <div style={{ position: "sticky", bottom: 16, width: "100%" }}>
                                        <button
                                            style={{
                                                width: "100%",
                                                height: 56,
                                                borderRadius: 999,
                                                border: "none",
                                                background: "linear-gradient(90deg, #e02424 0%, #ff6a00 50%, #ffd166 100%)",
                                                color: "#fff",
                                                fontWeight: 700,
                                                fontSize: 16,
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                            }}
                                            onClick={() => {
                                                const selected = products[active];
                                                console.log("Chọn sản phẩm:", selected.id);
                                                
                                            }}
                                        >
                                            Chọn sản phẩm này
                                        </button>
                                    </div>
                                </Box>
                            </div>
                        </Page>
                    }
                />
            </AnimationRoutes>
        </ZMPRouter>
    );
}
