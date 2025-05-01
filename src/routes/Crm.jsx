import { useState } from "react"
import {Search,Plus,MapPin,Globe,ChevronDown,Play,Pause,CircleCheck,ChevronLeft,ChevronRight,Clock,Sparkles,Zap,Ellipsis,PhoneOutgoing,SquarePen,ShieldX, Disc,
} from "lucide-react"
import { FcGoogle } from "react-icons/fc";

const calls = [
  {
    id: 1,
    name: "Alexis Sanchez",
    avatar: "https://s3-alpha-sig.figma.com/img/ad23/2f1a/673fe1645ff06837351bc6292fd60f72?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VVDq6rfQ2pWWTaAOpfg8tli0UbUgcDVHfFCIY7aJsQ93u9eSOdHxJMbBfGkZGbcw1gkl5Pdqfvp4VlKR-NUq4MesVpJtlCZY~kEf09IG6ryLnYULwWPfmy3VUrg0UanQQzpvb31sq3Lpdv0Bzjaccq56B1Nbdg5TB5XQWmCM6taNTrqCTQwNh7e9k~xQaBsh80nmLp6jzaUW61hj7i8POSXayfkWVpDOUuazUmb~GbMfscuO27o1ReIRRpn0m2ztRpbNtSAvi-tpzZx6V3bVqhoHAnfubJ-vGHPvDaX2MSokCbwAJZ8WW2ulnpW73XTuo8tZjdasWOBsmkt6Rz9~YQ__",
    phone: "+1263 263513",
    date: "6 mins ago",
    duration: "54:230000000",
    bgColor: "bg-orange-100",
  },
  {
    id: 2,
    name: "Emily Carter",
    avatar: "https://s3-alpha-sig.figma.com/img/c5f3/e84e/4fb2f97bf20e33c2b8cdf9197e1f2409?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k0Pgv~SnS1HG-3jj4WyeozE4GXVYpBnxgHWQRBz1m0ufyD04WpA5PjOhZEux8AqIh73kZ4UQZBt2Lw1V2Nsd83WZUm8mEkade8p~Rnr6KSMysZmO8Mv0kJuQnM6TTIGG05Czd5dHPUeD4KwVn11w8JMgkzlk82Q5iPUZqMWZLMWY3Up4yRJ0Vlpo7E7y4XnkCkRwKGXnECxwHzAphCum1yY~MQvDkrCfwBksGlQqA6laZNPuLaGhiFMc5HdP1Go2Aom~x29r7iZUygikzeF9p82mGCMPCRdup1ws98jaFXcn~yuq0t0LEwN4S5Eb5bvEo1GkemvRely0bH-piVkEZQ__",
    phone: "+1263 263513",
    date: "4 hours ago",
    duration: "54:230000000",
    bgColor: "bg-yellow-100",
  },
  {
    id: 3,
    name: "James Harrison",
    avatar: "https://s3-alpha-sig.figma.com/img/afac/9044/1bd1b90f58b13b3dfe5637587e1b9661?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hZaJTeiHMtAhzF0mzQMmpkDUh-7avxHcOP-zvd16gSFWASUQ8-PQGei8q321bz9DPoGyEKIBtPVl-x9FKbWoC1EaUp384DYHTDdJlQRBt9TOZs8zRr6poYGmVNk15L-wa4BBFydAbk1uHo081eN3-dyi1hIcH4YmwL1h4IzMi8lnMo4Z5KINfXUvE4gzA-y2-jYAD4Tzip2uL9hTod-gsDFMXHLbQx4Ftl0Uufs5cG6pnBNuNOVRowcWjDDSftVVqB2J8NhV6WvgVGwAF-4mQ3QFGiWH653f4dxWNIAea9G3hniSYcT800qrv5kj2ouDBrgm~IkzzAe~VW0zPmeGfw__",
    initials: "JH",
    phone: "+1263 263513",
    date: "Yesterday",
    duration: "54:230000000",
    bgColor: "bg-blue-100",
  },
  {
    id: 4,
    name: "Olivia Bennett",
    avatar: "https://s3-alpha-sig.figma.com/img/b52b/ff87/4bd5e2c4056e2551724da86e02902466?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eOAGmt7-rcQLSTD1Uvx8ckUBaduhmCRhRaSuSvHvNYSkMmPN1vt0DtBcIl7AE0yx3rk3561v75b6XrnAFnMdEkcWEIkLR5N4-ao6ZuABD4h31TcSdklnw5c9c4PLGkt50YQ1asl7b6po34yCwLyJ3M3W8CBKIGZZVZdAFOuTq6uZ4BTJSSa~EU~Od-AZBKSnnoms2e3FpyRTLc4Y1Zh4HpYpUDpeBmLVaXXVbrzAAyRdOTVPPsOBB5Re8-Pqcx-~iNviVTPyqRfa2sh2dpXydMfDhZr1lOgsG8F19EXUX5b0RFM3Uo91iy0mq9txnXQhGdFoqw6Lvdj-JiYsoDWclw__",
    phone: "+1263 263513",
    date: "June 2025",
    duration: "54:230000000",
    bgColor: "bg-green-100",
  },
]

const meetings = [
  {
    id: 1,
    lead: "Alexis Sanchez",
    avatar: "https://s3-alpha-sig.figma.com/img/b303/3293/64981872de114f9afc9909268c41d532?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=URL1KYG3YLKQ89ddu0Jv1TknY~LtQQm4vrS4MT6UO~0MTMshLNI5NQTrJuCL79W2hFegObJrrbhnkD~lX2cR2m9yaP6a8iW8PZ8q0KGOR2GF64isOkuSozI54zgUP9hDU8rEFWU5erXwuwhwgXJ1NtuzBXP2J9fQwocbL4R-qYjLrMYGS2KrM3FNZ31U1~L18YLYwkQfOphOZv6SBvFEH9jPbjNj66YCmMrUDC0GOOJfag65yc4u546JnCc3XQx7Uq2UpJ-ViBOv1VjQ3CgGyqrl5E2Hp11Z6fSSsiSBfQYnRB4LtnafLLCvdJ5Nm9Qvc7e0EMpPsdm8izUgR6xmWQ__",
    date: "27 Feb 2025",
    time: "06 minutes ago",
    createdBy: "Quickpipe AI",
    isAI: true,
    bgColor: "bg-purple-100",
  },
  {
    id: 2,
    lead: "Ruben Schleifer",
    avatar: "https://s3-alpha-sig.figma.com/img/ae49/d0da/6115d464049091b9698d07b84562a8f0?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kgeen2FpNLgv3BcZknG3W-~zL8O1m8BTAiJB-gBBbbxfLAsOSLkql3~rFms~l8dEi3CjzVyxnm7IWEm-d2At-UXDDjteybAmYUWfjYJbZYPhDBJqlYsZTV3WON1u2rpX6KiOKCRjaBs8YXTBNOFTuPYjcHwL~W0TTicsR2bR75VKQx1lqqFO1wA1aU3iITRqRlVhG91~R7DrVC8~xvy0s06xYuizao6WlS8zy-PPixaK4GDYw8oTY66dXQwncShOvPxKwQb2aMZ8mSRVik1bHrNNnpKGGbq1mpvbf5HPNqXb8i-5wu6rx8PIyyRSeH-fGdHaSq391TcTAH75ipISiA__",
    date: "27 Feb 2025",
    time: "06 minutes ago",
    createdBy: "Beeto Leru",
    isAI: false,
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    lead: "Kaylynn Geidt",
    avatar: "https://s3-alpha-sig.figma.com/img/c5f3/e84e/4fb2f97bf20e33c2b8cdf9197e1f2409?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k0Pgv~SnS1HG-3jj4WyeozE4GXVYpBnxgHWQRBz1m0ufyD04WpA5PjOhZEux8AqIh73kZ4UQZBt2Lw1V2Nsd83WZUm8mEkade8p~Rnr6KSMysZmO8Mv0kJuQnM6TTIGG05Czd5dHPUeD4KwVn11w8JMgkzlk82Q5iPUZqMWZLMWY3Up4yRJ0Vlpo7E7y4XnkCkRwKGXnECxwHzAphCum1yY~MQvDkrCfwBksGlQqA6laZNPuLaGhiFMc5HdP1Go2Aom~x29r7iZUygikzeF9p82mGCMPCRdup1ws98jaFXcn~yuq0t0LEwN4S5Eb5bvEo1GkemvRely0bH-piVkEZQ__",
    date: "27 Feb 2025",
    time: "06 minutes ago",
    createdBy: "Quickpipe AI",
    isAI: true,
    bgColor: "bg-yellow-100",
  },
  {
    id: 4,
    lead: "Rayna Vetrovs",
    avatar: "https://s3-alpha-sig.figma.com/img/b333/a10d/f8c23fab456b1b430a98b7405fb49665?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NbQfy3MRcNWFqJmOnGMb0A52Zqh6ve7Svq6yIPwjBi-5w8CumHKoaO~rYMr3BW3b6AeM3yfaD7W~A0vw93q8TmUVWAiWEt34iCaawNPTrwaKERehUzFUoNyrGFDesBOPjMrkOS3sKs61g5s4q1SfMJq-rsUxXp10TkChwnMYfg9JofNbrGFETstK7h5B7kqvwQkvaRKkOSrusC185AXbvUJ~tlGAaGIVO7Ko1lyKDAe8WA3x9yoah7lThXw6qMXJTh~DIH2dK9MLGLxRlODO5~u7Ljy63B8jIabenWnmE8vYh4XzWoHd0JaetfCqlfz2TjR2lskQV~7JUQza8jsH1w__",
    date: "27 Feb 2025",
    time: "06 minutes ago",
    createdBy: "Quickpipe AI",
    isAI: true,
    bgColor: "bg-pink-100",
  },
]

const opportunities = [
  {
    id: 1,
    opportunity: "BetaTech",
    contact: "Michael Regan",
    amount: "-",
    owner: "Beeto Leru",
    source: "Phone",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Discovery",
  },
  {
    id: 2,
    opportunity: "Greenfield",
    contact: "Jordyn Botosh",
    amount: "$12,839",
    owner: "Beeto Leru",
    source: "Email",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Discovery",
  },
  {
    id: 3,
    opportunity: "Acme Corp.",
    contact: "Emerson Saris",
    amount: "-",
    owner: "Beeto Leru",
    source: "Phone",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Proposal",
  },
  {
    id: 4,
    opportunity: "Vertex Health",
    contact: "Emerson Franci",
    amount: "-",
    owner: "Beeto Leru",
    source: "Phone",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Evaluation",
  },
  {
    id: 5,
    opportunity: "EcoBuild",
    contact: "Aspen Vaccaro",
    amount: "$200",
    owner: "Beeto Leru",
    source: "Email",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Evaluation",
  },
  {
    id: 6,
    opportunity: "EcoBuild",
    contact: "Ruben Torff",
    amount: "$12,839",
    owner: "Beeto Leru",
    source: "Phone",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Evaluation",
  },
  {
    id: 7,
    opportunity: "OmniTech",
    contact: "Carter Rosser",
    amount: "$12,839",
    owner: "Beeto Leru",
    source: "Email",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Evaluation",
  },
  {
    id: 8,
    opportunity: "Zenoth Co.",
    contact: "Lynn Tanner",
    amount: "$12,839",
    owner: "Beeto Leru",
    source: "Email",
    expectedClosing: "12/2/2025",
    actualClosing: "12/4/2025",
    lastInteraction: "12/2/2025 9:23 AM",
    stage: "Sales",
  },
]

export default function Crm() {
  const accounts = [
    {
      id: 1,
      name: "Microsoft Inc.",
      logo: "https://s3-alpha-sig.figma.com/img/88be/db6f/bd548b0155aebe1afeb8b51e2375808a?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qHU-nuSC~~S2~zKp-lsc7efOtqjPuiuq-p1j8P1YRN2MtsltQEcaj4uQVM2iy9w6K4MvfNsru6P~xT9Q1UNecBkwAqz2yvP8VsxZxuqFeGiTEn8tlS20hcELBIOVmeAB6Hg31i0-Tm4XtLBbFx61FcSj2vuXlCNmgznUyCEF1f-F1Oq6ap1zqMtCm-h5qqY32W2sfarNh16sJPFpd-uxrfsWVsVqwA5~bWOiuKB5K6ZgatoDqDdOqrNMvww1r1dVcvGEl-dA64oG6hcUHCCDAv0-ZDLKsVpgHJN3tpM1pjSaCSl0Nd40LpmPVxziZPCrDbnazK9VQHUFLs58qDgNUw__",
      logoBackground: "bg-[#f25022]",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 2,
      name: "M & M Boutique",
      logo: "https://s3-alpha-sig.figma.com/img/d3a5/92fa/910daf59226b7dc72d3256ae806bb9a0?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H31~qoUjyEWlRaGZlONcbmslv-1gm-xi6ucbcEw~~euBZuTR~UmJCrDRH2PaV7F3W3ha~UjdcXnOq~fmLWYkduWq0qQ0SfeWNJzGdAkYKlhfaDgTvDIu1u4qPusaemHPo4wiCzil8spnkB3ZTwNoWEGI-ljG8JthW9zu32zU139bPeLTPQZ34WP~RKn-jBDiPhT-VcdNGs3sKIKAPtHbXkfDf298vCEPLFdVgsHDjNdHnKd0JLwML-sgjysVM-OD4-d-GyKPd228gyqFNJx5bFrnZa9GbSXI7tJUzK~MbVHQdG4xDPw~xsBl1iKxGoXw2v7fVWWXXsCv44v2ZqPkzw__",
      logoBackground: "bg-teal-500",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["BM", "CE", "HR"],
    },
    {
      id: 3,
      name: "X (FormelyTwitter)",
      logo: "https://s3-alpha-sig.figma.com/img/3af9/0560/3d2392ebd00db1775b555cf4dbcd29fe?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FArFoTGANntS9Pa5S62qv8wKtlUWfeZg9K2aIfrxfMg3XLbSGzG2b4VF1V~Y13aaTuQrFI8s7bi3Vu8TFxF5o~hRd9xtnLmR2xswDhqKmuyth0gkmS9O0bvpC5qezFwL0UX1CySpVn1wn29CcTrnN8t3jfs~q~NSTtLL6Hz0iLE-3sm2IKAWoO43YIEw8UKg88yllbA01XRNs14p1YUMUjT-gJQCgsbZOVEp41sJunr3EO8eagmay4xiEWwcaae7vPfcbwLoJLI3Pt2DIruTqH7G~Q8VUkNOVhq0-NbvdPQGydEsg-5Ei52cn-EreX8eijq7cWsJ2K~T7RU39idcbw__",
      logoBackground: "bg-black",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["HR", "CE", "BM"],
    },
    {
      id: 4,
      name: "PWC",
      logo: "https://s3-alpha-sig.figma.com/img/7f7b/2b28/1d9939016d1ce03eceab3ff1479444b5?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WdmG4FqTaxvZg7-KZYkLuWC44k2aXbQuA1Md3P~zf~lGjzChRvij5tRMqgyv4KJxdWj9KuKGu9DgBzb5elK9KuTBSh4adyY2nBLih08TMnekoYNgtYLXD2PS0YoiXatjyC-phFOP6aCpL8Dvgy3gR1emdSyeGEnqY-Ai6PFftFjkcAlkIkhvrJPaeDHOELxasSRVuoo-Ggcxxz52v3WyqaxgHkZfK4iEIR1A5Ew~MDEQgQcod255HN5RdPvWvBCK2AtTYBE7Ytp4Ent5FBEOU5c4emo4nW2QGaGcqCSF66t73H2N0NxTocvD7by-6vEKBGVx4FRqRgTONisoRTnwvg__",
      logoBackground: "bg-orange-500",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 5,
      name: "Deloitte",
      logo: "https://s3-alpha-sig.figma.com/img/26a9/3a53/926d61cbf18c17def36384b764b4b0cf?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fhOyIx2E6lslg1MrCiCcZsWlTqMcSjMJ3~-EnkaHHjbV700vvReadjDjGAUWcXFRSwPJUfXeSqpRIfZgFiq41jpgv1qg9CX19JE1q5bhp2C-m38Ns6BvV~5lbUIQE2MkoZT4HbkGbn-TcOqJaM8WpcDSA83E1wdOg-ikjU6Zk2KyNhZ2wPOLeDSdKnDFK9ap-bM7PGCrXP0QmRnFRbbWNoY0Y0Q6Ua8D0wiDXR4D4007rbA2Ud~-CaX2Tun3ntqWcMCDCZrIRrLQqcD8Dp~NlJkTlYt9hUA9wG9eZ5g5AZuGZmEhy12RZtxMw~LhWyAyP76QPXnSKm52b~S3c4PasA__",
      logoBackground: "bg-black",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 6,
      name: "Life Planner Inc.",
      logo: "https://s3-alpha-sig.figma.com/img/f065/d635/7b4c9d42acc4e1793d19e8f503259f3f?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U75ZXRJyKN0yRHGyM4f~zF9HkagsU46radwUCqIbGoEuc1QB5CCrEzmQ50HEzkLw08aapFcs5jJ7GPrELvgI9a~D8nnOiABtRGntFcaoxWpB~ntDnk~DRjzB0kE6paqbX7sS03kIvqF-0cyTfpAe5381Qw4LyYMtvEHZScng2S6r-DbDfokzTNeT9SpFiJmMycZO54B~QBU3W3GyftJT7OTz9dLE5S9JcAgymLTfyflFz-ASBv~tstTrUusw39TqCvILgjcrnHQ5cQDTBV7VlCBYq7AfSLEDaZKS4HILkIbFzxv2sN7m5sNhgWQ4ztM6R9zv7IXPB8Eo2LkT1JPobQ__",
      logoBackground: "bg-pink-500",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 7,
      name: "Hop's Bakery",
      logo: "https://s3-alpha-sig.figma.com/img/d3a5/92fa/910daf59226b7dc72d3256ae806bb9a0?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H31~qoUjyEWlRaGZlONcbmslv-1gm-xi6ucbcEw~~euBZuTR~UmJCrDRH2PaV7F3W3ha~UjdcXnOq~fmLWYkduWq0qQ0SfeWNJzGdAkYKlhfaDgTvDIu1u4qPusaemHPo4wiCzil8spnkB3ZTwNoWEGI-ljG8JthW9zu32zU139bPeLTPQZ34WP~RKn-jBDiPhT-VcdNGs3sKIKAPtHbXkfDf298vCEPLFdVgsHDjNdHnKd0JLwML-sgjysVM-OD4-d-GyKPd228gyqFNJx5bFrnZa9GbSXI7tJUzK~MbVHQdG4xDPw~xsBl1iKxGoXw2v7fVWWXXsCv44v2ZqPkzw__",
      logoBackground: "bg-teal-500",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 8,
      name: "Manaflow",
      logo: "https://s3-alpha-sig.figma.com/img/d7f8/22b6/a7b41a5661bb413219ff939af1b3080b?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XmFx226EEYmqLvjD4PUJuhEEXvgl9KjTcv26MlqpsuLgthWKm53MHvqK8dRoajKwwGTJ8tNoTzn-6DgYf4OMKQhdEXF5oN4vYN7z3L3tQlE2LJYRHOIOHFAyoN-t~BPouW6UeNWcJgShXtZyyi4MYKlPSeJF8wPcEUwNYINIwGfBTFYNcjEMLaeayu0BR-yiTpO1Hjl18T8xYhK7CPXNWJqBK1GPyKN0HWxTQn55-GSau9NxYjvc1hoaax9gg3rxR6Vi3OF01-QSXdt0rEBDjXzks9gB7bKa7AN86Q2u4Iah8GXakVcnteV4vqFnCJWhgjxono1ck~OUSSKDglYqbg__",
      logoBackground: "bg-yellow-500",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 9,
      name: "Volvo Inc.",
      logo: "https://s3-alpha-sig.figma.com/img/8c51/4065/2b9ef4d97e29fed246db94dce3a10bae?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aoR3-ZepYLStw5s2sK5ImbmolWCkLul-r3WNi6qHWsUlGSv4u9IetxLmKEBAVJ0L4duUtUAEo5X~Ml7fT4dS9lAmm1MsgsIs-uBYLnxupyclXlMdsoomDgufX~U3qDQV1VilGTYbdeqSS32mgZ7M~On9y96GvyVHJ6~KfXN3B2j0Y03oYjzh-7IjNRaylEbKEWLkpZhLKVD31cLRYh8h8JEQdFGtNRi3qYQUfNYTYWFc0EkEWxB8d9S6YPMdrQTzOZcE3ourZwseqToJDlmLewbWXOlYb49MFQd49kiXUBKjFtg9RzumnIvdjxJ6uw2Ca8SjR8W3ZrRBZRK6Fassyw__",
      logoBackground: "bg-gray-200",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 10,
      name: "Epidemic Sounds",
      logo: "https://s3-alpha-sig.figma.com/img/32e8/f97f/3e08f0d9af04efd8aca9339225a039fe?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AYW2OQkevtzFybikPVCb6Pyd~GwPk~8On3A-qZtd5Pv~zx-whUg~7k1RU2ltyMS4cwh27sv~E-k1Pl-A2UaPWbtw4w1~qQFXLtNDHl3jyGP0C0d9ADA6PYqYSpb9z~FLFws~~WJ8IsNfAvOHb8eZe5MZLGpUKVFBiR294yFRWE6NCGhek34Jh2BYfpRIOdk420KbsVY6BUMvFVQzFoHJi6bGiIN8eDrsYxIft-XdaUFonv03E-L2d5lK7x3nZy8hbjSf~7vBfrdZD3L6ancFbKJIc85~aK0WX85ozOgbakRa4P2J-oH69z9yZZYK4q2JELUvYroEC5txM-0tA3uKgg__",
      logoBackground: "bg-black",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
    {
      id: 11,
      name: "Future Designers",
      logo: "https://s3-alpha-sig.figma.com/img/d3a5/92fa/910daf59226b7dc72d3256ae806bb9a0?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=H31~qoUjyEWlRaGZlONcbmslv-1gm-xi6ucbcEw~~euBZuTR~UmJCrDRH2PaV7F3W3ha~UjdcXnOq~fmLWYkduWq0qQ0SfeWNJzGdAkYKlhfaDgTvDIu1u4qPusaemHPo4wiCzil8spnkB3ZTwNoWEGI-ljG8JthW9zu32zU139bPeLTPQZ34WP~RKn-jBDiPhT-VcdNGs3sKIKAPtHbXkfDf298vCEPLFdVgsHDjNdHnKd0JLwML-sgjysVM-OD4-d-GyKPd228gyqFNJx5bFrnZa9GbSXI7tJUzK~MbVHQdG4xDPw~xsBl1iKxGoXw2v7fVWWXXsCv44v2ZqPkzw__",
      logoBackground: "bg-black",
      location: "United Kingdom",
      website: "www.microsoft.com/us",
      contacts: 24,
      contactAvatars: ["CE", "BM", "HR"],
    },
  ]
  
  const people = [
    {
      email: "xmitchell@hotmail.com",
      contact: "Lynn Tanner",
      provider: "Microsoft",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "tbaker@outlook.com",
      contact: "Capt. Trunk",
      provider: "Google",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "mgonzalez@aol.com",
      contact: "Thomas Anum",
      provider: "Google",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "xmitchell@hotmail.com",
      contact: "Lynn Tanner",
      provider: "Microsoft",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "tbaker@outlook.com",
      contact: "Capt. Trunk",
      provider: "Google",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "mgonzalez@aol.com",
      contact: "Thomas Anum",
      provider: "Google",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "yrodriguez@aol.com",
      contact: "B.A. Baracus",
      provider: "Microsoft",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "vflores@gmail.com",
      contact: "Devon Miles",
      provider: "Google",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
    {
      email: "yrodriguez@aol.com",
      contact: "B.A. Baracus",
      provider: "Microsoft",
      status: "Verified",
      company: "Tuxedo Suits Inc.",
      website: "https://tuxedosuits.com",
      title: "Design manager",
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const[showSortDropdown, setShowSortDropdown] = useState(false);
  const listItems = [
    { name: "All Statuses", icon: "⚡" },
    { name: "Active", icon: <Play size={20} className="text-blue-400" /> },
    { name: "Draft", icon: <SquarePen size={20} className="text-gray-600" /> },
    { name: "Paused", icon: <Pause size={20} className="text-orange-400" /> },
    { name: "Error", icon: <ShieldX size={20} className="text-red-600" /> },
    { name: "Completed", icon: <CircleCheck size={20} className="text-green-400" /> },
  ]

  const sortOptions = [
    { value: 'Newest first', label: 'Newest first' },
    { value: 'Oldest first', label: 'Oldest first' },
    { value: 'Name A - Z', label: 'Name A - Z' },
    { value: 'Name Z - A', label: 'Name Z - A' }
  ];


  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("Accounts")

  return (
    <div className="min-h-screen bg-[rgb(245,245,245)] md:ps-20">
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex flex-col md:flex-row">
            {["Accounts", "People", "Opportunities", "Calls", "Meetings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        {activeTab !== "Meetings" && activeTab !== "Opportunities" && (
          <div className="flex flex-wrap justify-center md:justify-between mb-6 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsOpen(!isOpen)}  
                  className="px-4 py-2 border border-gray-300 text-[15px] text-gray-400 cursor-pointer rounded-full flex gap-1 items-center">
                 <Zap size={18} className="text-gray-400 " /> All Statuses <ChevronDown className="text-gray-400" />
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-white shadow-md w-full rounded-lg">
                      {listItems.map((val) => (
                        <>
                        <button key={val.name} onClick={() => handleStatusChange(val.name)} className="px-4 py-2 w-full flex gap-2 cursor-pointer items-center hover:text-[#15a395] hover:bg-[#defffcf7]">
                          {val.icon} {val.name}
                        </button>
                        <hr className="text-gray-100" />
                        </>
                      ))}
                  </div>
                )}
              </div>

              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={() => setShowSortDropdown(!showSortDropdown)} 
                  className="px-4 py-2 border border-gray-300 cursor-pointer text-gray-600 rounded-full flex gap-1 items-center">
                  <span className="text-gray-400"> Oldest first</span>
                  <ChevronDown className="text-gray-400" />
                </button>
                {showSortDropdown && (
                <div 
                  className="origin-top-right absolute right-0  left-1 mt-2 w-56 rounded-md shadow-lg bg-white ring-opacity-5 focus:outline-none z-10"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left px-4 cursor-pointer py-2 text-sm hover:bg-gray-100 flex items-center ${
                           'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-teal-600 cursor-pointer hover:bg-teal-700 focus:ring-teal-500"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add new
              </button>

              {activeTab !== "Meetings" && activeTab !== "Accounts" &&(
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-[rgb(224,140,23)] to-[rgb(84,156,110)] hover:from-[rgb(204,130,20)] hover:to-[rgb(184,120,18)] focus:ring-[rgb(224,140,23)]">
                <PhoneOutgoing className="mr-2 h-5 w-5" />
                Call with AI
              </button>
                )
              }
            </div>
          </div>
        )}

        {/* Accounts Grid */}
        <div className="flex flex-wrap justify-center md:justify-between gap-5 w-full">
          {/* Accounts Grid */}
          {activeTab === "Accounts" &&
            accounts.map((account) => (
              <div key={account.id} className="bg-white rounded-lg shadow overflow-hidden relative">
                  <button className="text-gray-400 hover:text-gray-500 absolute top-2 right-2">
                    <Ellipsis />
                  </button>
                <div className="w-60 h-52 p-2 mt-8">

                  {/* Centering the logo container */}
                  <div className="flex justify-center">
                    <div
                      className={`${account.logoBackground} w-12 h-12 rounded-md flex items-center justify-center text-white`}
                    >
                      <img src={account.logo || "/placeholder.svg"} alt={account.name} className="w-8 h-8" />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 text-center my-2">{account.name}</h3>
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {account.location}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <Globe className="h-4 w-4 mr-1" />
                    {account.website}
                  </div>
                  <hr className="text-gray-200 py-1" />
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {account.contactAvatars.map((avatar, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white border-2 border-white ${
                            index % 3 === 0 ? "bg-blue-500" : index % 3 === 1 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                        >
                          {avatar}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{account.contacts} Contacts</span>
                  </div>
                </div>
              </div>
            ))}


          {activeTab === "People" && (
            <div className="col-span-full w-full overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-gray-300 text-sm text-muted-foreground">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium w-[40px]">
                      <input type="checkbox" className="rounded border-muted cursor-pointer" />
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[160px]">EMAIL</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[160px]">
                      CONTACT
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[160px]">
                      EMAIL PROVIDER
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[240px]">
                      STATUS
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[160px]">
                      COMPANY
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[160px]">
                      WEBSITE
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[160px]">TITLE</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person, idx) => (
                    <tr key={idx} className="border-b border-gray-300 text-sm">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded border-muted cursor-pointer" />
                      </td>
                      <td className="px-4 py-3 text-gray-600">{person.email}</td>
                      <td className="px-4 py-3">{person.contact}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {person.provider === "Microsoft" ? (
                            <>
                              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                  <path d="M10 1H1V10H10V1Z" fill="#F25022" />
                                  <path d="M20 1H11V10H20V1Z" fill="#7FBA00" />
                                  <path d="M10 11H1V20H10V11Z" fill="#00A4EF" />
                                  <path d="M20 11H11V20H20V11Z" fill="#FFB900" />
                                </svg>
                              </div>
                              Microsoft
                            </>
                          ) : (
                            <>
                              <FcGoogle size={20} className="me-1" />
                              Google
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-2 w-full">
                          {/* Verified Badge */}
                          <div className="flex items-center gap-1 bg-blue-100 rounded-full px-3 py-1 whitespace-nowrap">
                            <CircleCheck size={17} className="text-blue-500" />
                            <span className="text-blue-500 text-sm">Verified</span>
                          </div>

                          {/* Status Text */}
                          <div className="flex items-center gap-1 bg-gray-200 rounded-full px-3 py-1 whitespace-nowrap">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-xs text-gray-500">Not yet contacted</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 font-medium">{person.company}</td>
                      <td className="px-4 py-3 text-gray-400 font-medium">{person.website}</td>
                      <td className="px-4 py-3 text-gray-400 font-medium">{person.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-center px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-sm text-gray-400 border border-gray-400 rounded hover:text-gray-900 flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1 text-sm bg-gray-300 border border-gray-300 text-gray-900 rounded">1</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">2</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">3</button>
                    <span className="px-2 text-gray-600">...</span>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">45</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">46</button>
                  </div>
                  <button className="p-2 text-sm text-gray-400 border border-gray-400 rounded hover:text-gray-900 flex items-center gap-1">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Calls" && (
            <div className="col-span-full w-full overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium w-[40px]">
                      <input type="checkbox" className="rounded border-muted cursor-pointer" />
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[200px]">Lead</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">Phone</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">Date</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">
                      Call duration
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[120px]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {calls.map((call) => (
                    <tr key={call.id} className="border-b border-gray-300 text-sm">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded border-muted cursor-pointer" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {call.initials ? (
                            <div
                              className={`w-8 h-8 rounded-full ${call.bgColor} flex items-center justify-center text-sm font-medium`}
                            >
                              {call.initials}
                            </div>
                          ) : (
                            <img
                              src={call.avatar || "/placeholder.svg"}
                              alt={call.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <span className="font-medium">{call.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{call.phone}</td>
                      <td className="px-4 py-3 text-gray-500">{call.date}</td>
                      <td className="px-4 py-3 text-gray-500">{call.duration}</td>
                      <td className="px-4 py-3">
                        <button className="text-gray-400">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          )}
          {activeTab === "Opportunities" && (
            <div className="col-span-full w-full overflow-x-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md mb-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border rounded-full border-gray-300 leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Search..."
                  />
                </div>

              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}  
                  className="px-4 py-2 border border-gray-300 text-gray-400 rounded-full flex gap-1 items-center"
                >
                 <Zap size={18} className="text-gray-400" /> All Statuses <ChevronDown className="text-gray-400" />
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-white shadow-md w-44 rounded-lg">
                    <ul className="py-2 text-sm text-gray-700">
                      {listItems.map((val, index) => (
                        <li key={index} className="px-4 py-2 flex gap-2 items-center hover:bg-gray-100">
                          {val.icon} {val.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full flex gap-1 items-center">
                  <span className="text-gray-400"> Oldest first</span>
                  <ChevronDown className="text-gray-400" />
                </button>
                <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-[rgb(224,140,23)] to-[rgb(84,156,110)] hover:from-[rgb(204,130,20)] hover:to-[rgb(184,120,18)] focus:ring-[rgb(224,140,23)]"
              >
                <PhoneOutgoing className="mr-2 h-5 w-5" />
                Call with AI
              </button>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px] md:min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 text-sm text-muted-foreground bg-gray-100">
                      <th className="px-4 py-3 text-left font-medium w-[40px]">
                        <input type="checkbox" className="rounded border-muted cursor-pointer" />
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500">OPPORTUNITY</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500">CONTACT NAME</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 hidden md:table-cell">
                        AMOUNT
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500">OWNER</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 hidden md:table-cell">
                        SOURCE
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 hidden lg:table-cell">
                        EXPECTED CLOSING DATE
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 hidden lg:table-cell">
                        ACTUAL CLOSING DATE
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 hidden xl:table-cell">
                        LAST INTERACTION
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500">STAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map((opp) => (
                      <tr key={opp.id} className="border-b border-gray-300 text-sm hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input type="checkbox" className="rounded border-muted cursor-pointer" />
                        </td>
                        <td className="px-4 py-3 text-blue-500 hover:underline cursor-pointer">{opp.opportunity}</td>
                        <td className="px-4 py-3 text-blue-500 hover:underline cursor-pointer">{opp.contact}</td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{opp.amount}</td>
                        <td className="px-4 py-3">
                          <div className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-600">
                            {opp.owner}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{opp.source}</td>
                        <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{opp.expectedClosing}</td>
                        <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{opp.actualClosing}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 hidden xl:table-cell">{opp.lastInteraction}</td>
                        <td className="px-4 py-3 text-gray-500">{opp.stage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-center px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-sm text-gray-400 border border-gray-400 rounded hover:text-gray-900 flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1 text-sm bg-gray-300 border border-gray-300 text-gray-900 rounded">1</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">2</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">3</button>
                    <span className="px-2 text-gray-600">...</span>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">45</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">46</button>
                  </div>
                  <button className="p-2 text-sm text-gray-400 border border-gray-400 rounded hover:text-gray-900 flex items-center gap-1">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Meetings" && (
            <div className="col-span-full w-full overflow-x-auto">
              <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-6">
              <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
                <button
                  type="button"
                  className="flex items-center px-4 py-2 border border-transparent text-[10px] font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 "
                >
                  <Plus className="h-5 w-5" />
                  New Meeting
                </button>
              </div>
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-none text-sm text-muted-foreground">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[250px]">Lead</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">Date</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">Time</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[200px]">
                      Created by
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 flex items-center gap-1 text-left font-medium text-gray-400 w-[120px]">
                      <Disc />
                      Recording
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((meeting) => (
                    <tr key={meeting.id} className="border cursor-pointer group hover:bg-[#dbf2ef]  border-gray-300 text-sm ">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${meeting.bgColor} flex items-center justify-center`}>
                            <img
                              src={meeting.avatar || "/placeholder.svg"}
                              alt={meeting.lead}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </div>
                          <span className="text-gray-600">{meeting.lead}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{meeting.date}</td>
                      <td className="px-4 py-3 text-gray-600">{meeting.time}</td>
                      <td className="px-4 py-3">
                        {meeting.isAI ? (
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-[#15a395] bg-[#d1eeebf7] ">
                            <Sparkles className="w-4 h-4 mr-1" />
                            <span>{meeting.createdBy}</span>
                          </div>
                        ) : (
                          <span className="text-orange-400 bg-orange-100 font-medium rounded-full p-2">{meeting.createdBy}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Play size={20} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}