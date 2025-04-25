import { useState } from "react"
import {
Search,
MoreVertical,
Plus,
MapPin,
Globe,
ChevronDown,
Play,
Pause,
CircleCheck,
ChevronLeft,
ChevronRight,
Clock,
Sparkles,
Phone,
Zap,
Eye,
Hand,
CircleDollarSign,
} from "lucide-react"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import ScheduleForm from "../components/SheduleForm";
import EmailTemplateBuilder from "../components/EmailTemplate";
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

export default function CompaignTarget() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const listItems = [
    { name: "All Statuses", icon: "⚡" },
    { name: "Play", icon: <Play size={20} className="text-blue-400" /> },
    { name: "Paused", icon: <Pause size={20} className="text-orange-400" /> },
    { name: "Completed", icon: <CircleCheck size={20} className="text-green-400" /> },
  ]
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

  const box = [
    { amount: '214', icon: <Zap size={24} className="text-blue-500" />, text: "Sequence started", bg: "bg-blue-100" },
    { amount: '45%', icon: <Eye size={24} className="text-purple-500" />, text: "Open rate", bg: "bg-purple-100" },
    { amount: '67%', icon: <Hand size={24} className="text-pink-500" />, text: "Click rate", bg: "bg-pink-100" },
    { amount: '145', icon: <CircleDollarSign size={24} className="text-red-500" />, text: "Opportunities", bg: "bg-red-100" },
    { amount: '26', icon: <CircleDollarSign size={24} className="text-yellow-500" />, text: "Conversion", bg: "bg-yellow-100" },
 ];
 const data = [
    { name: "SEP", sent: 250, opens: 200, clicks: 150, opportunities: 100, conversions: 50 },
    { name: "OCT", sent: 150, opens: 120, clicks: 90, opportunities: 60, conversions: 30 },
    { name: "NOV", sent: 180, opens: 140, clicks: 100, opportunities: 80, conversions: 40 },
    { name: "DEC", sent: 220, opens: 170, clicks: 130, opportunities: 90, conversions: 60 },
];

  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("Accounts")

  return (
    <div className="min-h-screen bg-gray-50 ps-20">
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            {["Analytics", "People", "Sequence", "Shedule", "Options"].map((tab) => (
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
        {activeTab == "People" && (
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full flex gap-1 items-center"
                >
                  All Statuses <ChevronDown />
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
              </div>

              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-between w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500"
                >
                  <span>Oldest first</span>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add new
              </button>
            </div>
          </div>
        )}

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
        {activeTab === "Analytics" && (
            <>
            {box.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg px-4 py-6 flex items-center gap-3 bg-white">
                <div className={`p-3 rounded-full ${item.bg}`}>{item.icon}</div>
                <div>
                    <div className="text-2xl font-bold">{item.amount}</div>
                    <div className="text-sm text-gray-500">{item.text}</div>
                </div>
                </div>
            ))}
            </>
        )}

          {activeTab === "People" && (
            <div className="col-span-full w-full overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium w-[40px]">
                      <input type="checkbox" className="rounded border-muted cursor-pointer" />
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[200px]">EMAIL</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">
                      CONTACT
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">
                      EMAIL PROVIDER
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[200px]">
                      STATUS
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">
                      COMPANY
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[200px]">
                      WEBSITE
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400 w-[180px]">TITLE</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person, idx) => (
                    <tr key={idx} className="border-b text-sm">
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
                              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                  <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                  />
                                  <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                  />
                                  <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                  />
                                  <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                  />
                                </svg>
                              </div>
                              Google
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-blue-500">Verified</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>Not yet contacted</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{person.company}</td>
                      <td className="px-4 py-3 text-blue-500">{person.website}</td>
                      <td className="px-4 py-3">{person.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-900 rounded">1</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">2</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">3</button>
                    <span className="px-2 text-gray-600">...</span>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">45</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">46</button>
                  </div>
                  <button className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Sequence" && (
            <div className="col-span-full w-full overflow-x-auto">
              <EmailTemplateBuilder />
            </div>
          )}
          {activeTab === "Shedule" && (
            <div className="col-span-full w-full overflow-x-auto">
              <main className="min-h-screen bg-gray-50 py-8">
                  <ScheduleForm />
              </main>
            </div>
          )}
          {activeTab === "Options" && (
            <div className="col-span-full w-full overflow-x-auto">
              <div className="border border-gray-200 rounded-lg p-4 w-[900px] mx-auto bg-white my-2">
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Owner of Campaign</h3>
                    <p className="text-gray-400 text-[14px] mt-2">Select the owner of thid compaign</p>
                  </div>
                  <div className="border border-gray-50">Select</div>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Daily Lmit</h3>
                    <p className="text-gray-400 text-[14px]">Max number of emails to send per day for this compaign</p>
                  </div>
                  <div className="border border-gray-200 ps-2 pe-10 py-1 rounded w-36">50</div>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Max new leads per day</h3>
                  </div>
                  <div className="border border-gray-200 ps-2 pe-10 py-1 rounded w-36">No limit</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 w-[900px] mx-auto bg-white my-2">
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Stop campaign for company on reply</h3>
                    <p className="text-gray-400 text-[14px] mt-2">Stop the compaign automaticlly for all leads from a company if a reply is received from any of them.</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Stop sending emails on Auto-reply</h3>
                    <p className="text-gray-400 text-[14px]">Stop sending emails to a lead if a response has been received</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Open tracking</h3>
                    <p className="text-gray-400 text-[14px]">Track email opens</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Insert insubscribe to link header</h3>
                    <p className="text-gray-400 text-[14px]">Automatically adds an unsubscribe link to email headers for on-click unsubscription by supported email providers</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
              </div>



              <div className="border border-gray-200 rounded-lg p-4 w-[900px] mx-auto bg-white my-2">
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">CC</h3>
                    <p className="text-gray-400 text-[14px] mt-2">Send a copy of the email to the addresses listed in the field</p>
                  </div>
                  <input type="text"className="w-80 px-10 border border-gray-500 rounded" />
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">BCC</h3>
                    <p className="text-gray-400 text-[14px] w-48">Send a copy of the email to certain receipients without the other receipients knowing about it</p>
                  </div>
                  <input type="text"className="w-80 px-10 border border-gray-500 rounded" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
