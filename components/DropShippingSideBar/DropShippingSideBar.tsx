import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import SyncIcon from "@mui/icons-material/Sync";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useWindowSize } from "@/lib/hooks/useWindowSize";
import type { RootState } from "@/lib/redux/store";

import BoxIcon from "../../public/box.svg";
import BoxGreenIcon from "../../public/box-green.svg";
import PaymentIcon from "../../public/payment.svg";
import PaymentGreenIcon from "../../public/payment-green.svg";
import { CollapseButton, Option, SideBar } from "./DropShippingSideBar.style";

interface SideBarOptionPropTypes {
  link: string;
  optKey: string;
  label: string;
  icon: JSX.Element;
  collapsed: boolean;
}

function SideBarOption({
  link,
  optKey,
  label,
  icon,
  collapsed,
}: SideBarOptionPropTypes) {
  const router = useRouter();
  const { pathname } = router;

  const ordersCount = useSelector(
    (state: RootState) => state?.order?.ordersCount
  );

  const myProductsCount = useSelector(
    (state: RootState) => state?.myProducts?.myProductsCount
  );

  const isActiveRoute = (key: string) => pathname?.includes(key);

  const getClassName = (key: string) => {
    const isActive = isActiveRoute(key);
    let className = "";

    if (isActive) {
      className = "is-active";
    }

    if (isActive && key === "dashboard") {
      className += " bg-[transparent]";
    }

    if (collapsed) {
      className = `${className} ` + "collapsed";
    }
    return className;
  };

  const getCount = (key) => {
    if (key === "my-products") {
      return myProductsCount;
    }
    if (key === "my-orders") {
      return ordersCount;
    }
    return null;
  };

  const className = getClassName(optKey);

  const count = getCount(optKey);

  return (
    <Link href={link} passHref>
      <Option className={className}>
        <Box className="flex items-center gap-x-4">
          {icon}
          <Typography variant="body2" className={collapsed ? "hidden" : ""}>
            {label}
          </Typography>
        </Box>
        {Boolean(count) && (
          <Box className={collapsed ? "hidden" : "pr-4"}>{count}</Box>
        )}
      </Option>
    </Link>
  );
}

export function DropShippingSideBar() {
  const router = useRouter();
  const { pathname } = router;

  const windowSize = useWindowSize();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);

  useEffect(() => {
    if (windowSize?.width && windowSize?.width < 1366) {
      setCollapsed(true);
    }
  }, [windowSize?.width]);

  const handleCollapseSideBar = () => {
    setCollapsed(!collapsed);
  };

  const isActiveRoute = (key: string) => pathname?.includes(key);

  const handleOpenAccordion = () => {
    setExpanded(!expanded);
  };

  const upperOptions = [
    {
      label: "My Products",
      icon: isActiveRoute("my-products") ? (
        <Image src={BoxGreenIcon} alt="box" />
      ) : (
        <Image src={BoxIcon} alt="box" />
      ),
      key: "my-products",
      path: "/default-channel/en-US/my-products",
    },
    {
      label: "My Orders",
      icon: <AssignmentOutlinedIcon />,
      key: "my-orders",
      path: "/default-channel/en-US/my-orders",
    },
    {
      label: "My Vendors",
      icon: <PersonOutlinedIcon />,
      key: "my-vendors",
      path: "/default-channel/en-US/my-vendors",
    },
  ];

  const lowerOptions = [
    {
      label: "My Payments",
      icon: isActiveRoute("my-payments") ? (
        <Image src={PaymentGreenIcon} alt="payment" />
      ) : (
        <Image src={PaymentIcon} alt="payment" />
      ),
      key: "my-payments",
      path: "/default-channel/en-US/my-payments",
    },
    {
      label: "Help Center",
      icon: <HelpOutlineOutlinedIcon />,
      key: "help-center",
      path: "/default-channel/en-US/help-center",
    },
    {
      label: "My Store",
      icon: <StoreOutlinedIcon />,
      key: "my-store",
      path: "/default-channel/en-US/my-store",
    },
    {
      label: "Settings",
      icon: <SettingsOutlinedIcon />,
      key: "settings",
      path: "/default-channel/en-US/settings",
    },
  ];

  const isDashboardActive = pathname?.includes("dashboard")
    ? "is-active pl-0"
    : "";
  const isCollapsed = collapsed ? "p-0" : "p-0 pr-4 m-0";

  return (
    <SideBar
      className={
        collapsed
          ? "sidebar-collapsed hidden lg:block"
          : "sidebar-expanded hidden lg:block"
      }
    >
      <CollapseButton>
        {collapsed ? (
          <NavigateNextOutlinedIcon onClick={handleCollapseSideBar} />
        ) : (
          <NavigateBeforeOutlinedIcon onClick={handleCollapseSideBar} />
        )}
      </CollapseButton>
      <Typography
        variant="h4"
        className={collapsed ? "hidden" : "pl-5 my-5 lg:my-10"}
      >
        Sharove Dashboard
      </Typography>

      <div>
        <Accordion className="m-0 shadow-none" expanded={collapsed || expanded}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                className={collapsed ? "hidden" : "block"}
                onClick={handleOpenAccordion}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={`${isDashboardActive} ${isCollapsed}`}
          >
            <SideBarOption
              link="/default-channel/en-US/dashboard"
              optKey="dashboard"
              icon={<DashboardIcon />}
              collapsed={collapsed}
              label="Dashboard"
            />
          </AccordionSummary>
          <AccordionDetails className="p-0">
            {upperOptions.map((option) => {
              const { path, key, icon, label } = option;
              return (
                <SideBarOption
                  key={key}
                  link={path}
                  optKey={key}
                  icon={icon}
                  collapsed={collapsed}
                  label={label}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
        <SideBarOption
          link="/default-channel/en-US/auto-sync"
          optKey="auto-sync"
          icon={<SyncIcon />}
          collapsed={collapsed}
          label="Auto Sync"
        />
      </div>

      <div className="lower-options">
        {lowerOptions.map((option) => {
          const { path, key, icon, label } = option;
          return (
            <SideBarOption
              link={path}
              key={key}
              optKey={key}
              icon={icon}
              collapsed={collapsed}
              label={label}
            />
          );
        })}
      </div>
    </SideBar>
  );
}
