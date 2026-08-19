import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const file = join(process.cwd(), 'src', 'header.jsx');
let text = readFileSync(file, 'utf8');
if (!text.includes("from 'react'")) {
  text = "import { useState } from 'react'\n" + text;
}
text = text.replaceAll('class=', 'className=');
text = text.replaceAll('onclick=', 'onClick=');
text = text.replaceAll('href="javascript:void(0)"', 'href="#"');
text = text.replaceAll("href='javascript:void(0)'", "href='#'");
text = text.replaceAll('export const Header=()=>{', 'export const Header = () => {\n    const [isNavOpen, setIsNavOpen] = useState(false)\n');
text = text.replaceAll('id="mySidenav" className="sidenav"', 'id="mySidenav" className={`sidenav${isNavOpen ? " open-side" : ""}`}');
text = text.replaceAll('href="#" onClick="openNav()"', 'href="#" onClick={(e)=>{e.preventDefault(); setIsNavOpen(true);}}');
text = text.replaceAll('href="#" onClick="closeNav()"', 'href="#" onClick={(e)=>{e.preventDefault(); setIsNavOpen(false);}}');
text = text.replaceAll("href='#' onClick=\"openNav()\"", "href='#' onClick={(e)=>{e.preventDefault(); setIsNavOpen(true);}}" );
text = text.replaceAll("href='#' onClick=\"closeNav()\"", "href='#' onClick={(e)=>{e.preventDefault(); setIsNavOpen(false);}}" );
writeFileSync(file, text, 'utf8');
console.log('patched src/header.jsx');
