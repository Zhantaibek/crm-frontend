import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { usersApi } from "@/api/users.api";
import { useMyOrders } from "@/hooks/useOrders";
import { useToastContext } from "@/App";
import { Link } from "react-router-dom";
import { OrderCardSkeleton } from "@/components/ui/Skeleton";

export const ProfilePage = () => {
  const { user, setUser } = useAuthStore();
  const { showToast } = useToastContext();
  const { data: orders, isLoading: ordersLoading } = useMyOrders();

  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== password2) {
      showToast("Пароли не совпадают");
      return;
    }
    setLoading(true);
    try {
      const data: any = { name, surname, email };
      if (password) data.password = password;
      const updated = await usersApi.updateMe(data);
      setUser(updated);
      showToast("Профиль обновлён ✅");
      setPassword("");
      setPassword2("");
    } catch {
      showToast("Ошибка при обновлении профиля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-hero page-hero--about">
        <div className="container">
          <div className="page-hero__breadcrumb">
            <Link to="/">Главная</Link> / Личный кабинет
          </div>
          <h1 className="page-hero__title">Личный кабинет</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {/* SIDEBAR */}
            <div
              style={{
                background: "white",
                border: "1px solid var(--beige-dark)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                position: "sticky",
                top: "88px",
              }}
            >
              {/* Avatar */}
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    margin: "0 auto 12px",
                  }}
                >
                  {user?.name?.[0]?.toUpperCase()}
                  {user?.surname?.[0]?.toUpperCase()}
                </div>
                <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                  {user?.name} {user?.surname}
                </div>
                <div
                  style={{
                    fontSize: ".82rem",
                    color: "var(--text-light)",
                    marginTop: "4px",
                  }}
                >
                  {user?.email}
                </div>
                <div style={{ marginTop: "8px" }}>
                  <span
                    className={`admin-badge ${
                      user?.role === "admin"
                        ? "admin-badge--admin"
                        : "admin-badge--user"
                    }`}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>

              {/* Nav */}
              <nav
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {[
                  { key: "profile", label: "👤 Мой профиль" },
                  { key: "orders", label: "📦 Мои заказы" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--radius)",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: ".88rem",
                      fontWeight: 500,
                      background:
                        activeTab === tab.key
                          ? "var(--green-pale)"
                          : "transparent",
                      color:
                        activeTab === tab.key
                          ? "var(--green)"
                          : "var(--text-mid)",
                      transition: "all .2s",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* CONTENT */}
            <div>
              {activeTab === "profile" && (
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--beige-dark)",
                    borderRadius: "var(--radius-lg)",
                    padding: "36px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      marginBottom: "28px",
                    }}
                  >
                    Личные данные
                  </h2>
                  <form onSubmit={handleUpdate}>
                    <div className="reg-row">
                      <div className="form-group">
                        <label>Имя</label>
                        <input
                          type="text"
                          className="form-input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Фамилия</label>
                        <input
                          type="text"
                          className="form-input"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div
                      style={{
                        borderTop: "1px solid var(--beige-mid)",
                        paddingTop: "24px",
                        marginTop: "8px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          marginBottom: "16px",
                        }}
                      >
                        Смена пароля
                      </h3>
                      <div className="reg-row">
                        <div className="form-group">
                          <label>Новый пароль</label>
                          <input
                            type="password"
                            className="form-input"
                            placeholder="Минимум 6 символов"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Подтвердите пароль</label>
                          <input
                            type="password"
                            className="form-input"
                            placeholder="Повторите пароль"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn--primary"
                      disabled={loading}
                    >
                      {loading ? "Сохраняем..." : "Сохранить изменения"}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      marginBottom: "24px",
                    }}
                  >
                    Мои заказы
                  </h2>

                  {ordersLoading && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      {Array.from({ length: 3 }).map((_, i) => (
                        <OrderCardSkeleton key={i} />
                      ))}
                    </div>
                  )}

                  {orders?.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "60px",
                        background: "white",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--beige-dark)",
                      }}
                    >
                      <div style={{ fontSize: "3rem", marginBottom: "16px" }}>
                        📦
                      </div>
                      <h3 style={{ marginBottom: "8px" }}>Заказов пока нет</h3>
                      <p
                        style={{
                          color: "var(--text-mid)",
                          marginBottom: "20px",
                        }}
                      >
                        Перейдите в каталог и сделайте первый заказ
                      </p>
                      <Link to="/catalog" className="btn btn--primary">
                        Перейти в каталог
                      </Link>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {orders?.map((order) => {
                      const sum = order.products.reduce(
                        (s, p) => s + Number(p.product.price),
                        0
                      );
                      return (
                        <div
                          key={order.id}
                          style={{
                            background: "white",
                            border: "1px solid var(--beige-dark)",
                            borderRadius: "var(--radius-lg)",
                            padding: "24px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "16px",
                            }}
                          >
                            <div>
                              <div
                                style={{ fontWeight: 600, fontSize: "1rem" }}
                              >
                                Заказ #{order.id}
                              </div>
                              <div
                                style={{
                                  fontSize: ".82rem",
                                  color: "var(--text-light)",
                                  marginTop: "2px",
                                }}
                              >
                                {new Date(order.createAt).toLocaleDateString(
                                  "ru-RU",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontSize: "1.2rem",
                                  fontWeight: 700,
                                  color: "var(--green)",
                                }}
                              >
                                {sum.toLocaleString()} ₽
                              </div>
                              <div
                                style={{
                                  fontSize: ".75rem",
                                  color: "var(--text-light)",
                                }}
                              >
                                {order.products.length} товаров
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {order.products.map((p) => (
                              <div
                                key={p.id}
                                style={{
                                  padding: "6px 12px",
                                  background: "var(--beige)",
                                  borderRadius: "999px",
                                  fontSize: ".78rem",
                                  color: "var(--text-mid)",
                                }}
                              >
                                {p.product.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
