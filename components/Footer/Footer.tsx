import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Container, Grid, List, ListItemText } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import { SharContainer } from "@/components";
import { usePaths } from "@/lib/paths";

import {
  FooterContact,
  FooterCopywrite,
  FooterSupport,
  FooterWrap,
  IconWrap,
} from "./Footer.style";

const support = [
  { list: "Help Center" },
  { list: "Shipping Information" },
  { list: "Return Policy" },
  { list: "Privacy Policy" },
  { list: "Terms of Use" },
];
const contact = [
  { list: "+1 213.745.3001" },
  { list: "7:30am - 5:30pm PST (M - F)" },
  { list: "800 E 12th St. #403" },
  { list: "Los Angeles, CA 90021" },
];

export function Footer() {
  const [supportList] = useState(support);
  const [contactList] = useState(contact);

  const paths = usePaths();
  return (
    <FooterWrap>
      <SharContainer>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Link href={paths.$url()} passHref>
                <img src="/Logo.png" alt="SHAROVE LOGO" loading="lazy" />
              </Link>
              <IconWrap>
                <a href="#">
                  <FacebookIcon />
                </a>
                <a href="#">
                  <TwitterIcon />
                </a>
                <a href="#">
                  <InstagramIcon />
                </a>
                <a href="#">
                  <PinterestIcon />
                </a>
              </IconWrap>
            </Grid>
            <Grid container item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FooterSupport className="sm:mt-0 mt-6 block">
                  <b>Support</b>
                  <List>
                    {supportList.map((item: any) => (
                      <ListItemText>
                        <a href="#">{item.list}</a>
                      </ListItemText>
                    ))}
                  </List>
                </FooterSupport>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FooterContact className="sm:mt-0 mt-6">
                  <b>Contact Information</b>

                  <List>
                    {contactList.map((item: any) => (
                      <ListItemText>
                        <a href="#">{item.list}</a>
                      </ListItemText>
                    ))}
                  </List>
                </FooterContact>
              </Grid>
              <FooterCopywrite>
                <small>
                  © 2009 - 2021 OrangeShine.com. All Rights Reserved.
                </small>
              </FooterCopywrite>
            </Grid>
          </Grid>
        </Container>
      </SharContainer>
    </FooterWrap>
  );
}
