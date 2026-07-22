import{_ as i,C as t,o as l,c as o,j as e,a,E as p,a2 as d}from"./chunks/framework.CHeM0PsO.js";const A=JSON.parse('{"title":"Zone (client)","description":"","frontmatter":{"title":"Zone (client)","outline":2},"headers":[],"relativePath":"natives/client/zone.md","filePath":"natives/client/zone.md"}'),c={name:"natives/client/zone.md"},h={id:"zone",tabindex:"-1"};function r(k,s,E,g,u,C){const n=t("Badge");return l(),o("div",null,[e("h1",h,[s[0]||(s[0]=a("Zone ",-1)),p(n,{type:"info",text:"client"}),s[1]||(s[1]=a()),p(n,{type:"tip",text:"9 natives"}),s[2]||(s[2]=a()),s[3]||(s[3]=e("a",{class:"header-anchor",href:"#zone","aria-label":'Permalink to "Zone <Badge type="info" text="client" /> <Badge type="tip" text="9 natives" />"'},"​",-1))]),s[4]||(s[4]=d(`<h2 id="clearpopscheduleoverridevehiclemodel" tabindex="-1">ClearPopscheduleOverrideVehicleModel <a class="header-anchor" href="#clearpopscheduleoverridevehiclemodel" aria-label="Permalink to &quot;ClearPopscheduleOverrideVehicleModel&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ClearPopscheduleOverrideVehicleModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> schedule)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Only used once in the decompiled scripts. Seems to be related to scripted vehicle generators.  </span></span>
<span class="line"><span>Modified example from &quot;am_imp_exp.c4&quot;, line 6418:  </span></span>
<span class="line"><span>/* popSchedules[0] = ZONE::GET_ZONE_POPSCHEDULE(ZONE::GET_ZONE_AT_COORDS(891.3, 807.9, 188.1));  </span></span>
<span class="line"><span>etc.  </span></span>
<span class="line"><span>*/  </span></span>
<span class="line"><span>STREAMING::SET_MODEL_AS_NO_LONGER_NEEDED(vehicleHash);  </span></span>
<span class="line"><span>ZONE::CLEAR_POPSCHEDULE_OVERRIDE_VEHICLE_MODEL(popSchedules[index]);</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>schedule</code></td><td><code>int</code></td><td><code>POPSCHEDULE_ID</code></td></tr></tbody></table><p><strong>Hash</strong> <code>0x5C0DE367AA0D911C</code> · <strong>Lua</strong> <code>CLEAR_POPSCHEDULE_OVERRIDE_VEHICLE_MODEL</code></p><h2 id="gethashofmapareaatcoords" tabindex="-1">GetHashOfMapAreaAtCoords <a class="header-anchor" href="#gethashofmapareaatcoords" aria-label="Permalink to &quot;GetHashOfMapAreaAtCoords&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetHashOfMapAreaAtCoords</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Coords_x, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Coords_y, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Coords_z)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Returns a hash representing which part of the map the given coords are located.  </span></span>
<span class="line"><span>Possible return values:  </span></span>
<span class="line"><span>(Hash of) city -&gt; -289320599  </span></span>
<span class="line"><span>(Hash of) countryside -&gt; 2072609373  </span></span>
<span class="line"><span>C# Example :  </span></span>
<span class="line"><span>Ped player = Game.Player.Character;  </span></span>
<span class="line"><span>Hash h = Function.Call&lt;Hash&gt;(Hash.GET_HASH_OF_MAP_AREA_AT_COORDS, player.Position.X, player.Position.Y, player.Position.Z);</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>Coords_x</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr><tr><td><code>Coords_y</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr><tr><td><code>Coords_z</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr></tbody></table><p><strong>Returns</strong> <code>int</code> · <strong>Hash</strong> <code>0x7EE64D51E8498728</code> · <strong>Lua</strong> <code>GET_HASH_OF_MAP_AREA_AT_COORDS</code></p><h2 id="getnameofzone" tabindex="-1">GetNameOfZone <a class="header-anchor" href="#getnameofzone" aria-label="Permalink to &quot;GetNameOfZone&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetNameOfZone</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> VecCoors_x, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> VecCoors_y, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> VecCoors_z)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>AIRP = Los Santos International Airport  </span></span>
<span class="line"><span>ALAMO = Alamo Sea  </span></span>
<span class="line"><span>ALTA = Alta  </span></span>
<span class="line"><span>ARMYB = Fort Zancudo  </span></span>
<span class="line"><span>BANHAMC = Banham Canyon Dr  </span></span>
<span class="line"><span>BANNING = Banning  </span></span>
<span class="line"><span>BEACH = Vespucci Beach  </span></span>
<span class="line"><span>BHAMCA = Banham Canyon  </span></span>
<span class="line"><span>BRADP = Braddock Pass  </span></span>
<span class="line"><span>BRADT = Braddock Tunnel  </span></span>
<span class="line"><span>BURTON = Burton  </span></span>
<span class="line"><span>CALAFB = Calafia Bridge  </span></span>
<span class="line"><span>CANNY = Raton Canyon  </span></span>
<span class="line"><span>CCREAK = Cassidy Creek  </span></span>
<span class="line"><span>CHAMH = Chamberlain Hills  </span></span>
<span class="line"><span>CHIL = Vinewood Hills  </span></span>
<span class="line"><span>CHU = Chumash  </span></span>
<span class="line"><span>CMSW = Chiliad Mountain State Wilderness  </span></span>
<span class="line"><span>CYPRE = Cypress Flats  </span></span>
<span class="line"><span>DAVIS = Davis  </span></span>
<span class="line"><span>DELBE = Del Perro Beach  </span></span>
<span class="line"><span>DELPE = Del Perro  </span></span>
<span class="line"><span>DELSOL = La Puerta  </span></span>
<span class="line"><span>DESRT = Grand Senora Desert  </span></span>
<span class="line"><span>DOWNT = Downtown  </span></span>
<span class="line"><span>DTVINE = Downtown Vinewood  </span></span>
<span class="line"><span>EAST_V = East Vinewood  </span></span>
<span class="line"><span>EBURO = El Burro Heights  </span></span>
<span class="line"><span>ELGORL = El Gordo Lighthouse  </span></span>
<span class="line"><span>ELYSIAN = Elysian Island  </span></span>
<span class="line"><span>GALFISH = Galilee  </span></span>
<span class="line"><span>GOLF = GWC and Golfing Society  </span></span>
<span class="line"><span>GRAPES = Grapeseed  </span></span>
<span class="line"><span>GREATC = Great Chaparral  </span></span>
<span class="line"><span>HARMO = Harmony  </span></span>
<span class="line"><span>HAWICK = Hawick  </span></span>
<span class="line"><span>HORS = Vinewood Racetrack  </span></span>
<span class="line"><span>HUMLAB = Humane Labs and Research  </span></span>
<span class="line"><span>JAIL = Bolingbroke Penitentiary  </span></span>
<span class="line"><span>KOREAT = Little Seoul  </span></span>
<span class="line"><span>LACT = Land Act Reservoir  </span></span>
<span class="line"><span>LAGO = Lago Zancudo  </span></span>
<span class="line"><span>LDAM = Land Act Dam  </span></span>
<span class="line"><span>LEGSQU = Legion Square  </span></span>
<span class="line"><span>LMESA = La Mesa  </span></span>
<span class="line"><span>LOSPUER = La Puerta  </span></span>
<span class="line"><span>MIRR = Mirror Park  </span></span>
<span class="line"><span>MORN = Morningwood  </span></span>
<span class="line"><span>MOVIE = Richards Majestic  </span></span>
<span class="line"><span>MTCHIL = Mount Chiliad  </span></span>
<span class="line"><span>MTGORDO = Mount Gordo  </span></span>
<span class="line"><span>MTJOSE = Mount Josiah  </span></span>
<span class="line"><span>MURRI = Murrieta Heights  </span></span>
<span class="line"><span>NCHU = North Chumash  </span></span>
<span class="line"><span>NOOSE = N.O.O.S.E  </span></span>
<span class="line"><span>OCEANA = Pacific Ocean  </span></span>
<span class="line"><span>PALCOV = Paleto Cove  </span></span>
<span class="line"><span>PALETO = Paleto Bay  </span></span>
<span class="line"><span>PALFOR = Paleto Forest  </span></span>
<span class="line"><span>PALHIGH = Palomino Highlands  </span></span>
<span class="line"><span>PALMPOW = Palmer-Taylor Power Station  </span></span>
<span class="line"><span>PBLUFF = Pacific Bluffs  </span></span>
<span class="line"><span>PBOX = Pillbox Hill  </span></span>
<span class="line"><span>PROCOB = Procopio Beach  </span></span>
<span class="line"><span>RANCHO = Rancho  </span></span>
<span class="line"><span>RGLEN = Richman Glen  </span></span>
<span class="line"><span>RICHM = Richman  </span></span>
<span class="line"><span>ROCKF = Rockford Hills  </span></span>
<span class="line"><span>RTRAK = Redwood Lights Track  </span></span>
<span class="line"><span>SANAND = San Andreas  </span></span>
<span class="line"><span>SANCHIA = San Chianski Mountain Range  </span></span>
<span class="line"><span>SANDY = Sandy Shores  </span></span>
<span class="line"><span>SKID = Mission Row  </span></span>
<span class="line"><span>SLAB = Stab City  </span></span>
<span class="line"><span>STAD = Maze Bank Arena  </span></span>
<span class="line"><span>STRAW = Strawberry  </span></span>
<span class="line"><span>TATAMO = Tataviam Mountains  </span></span>
<span class="line"><span>TERMINA = Terminal  </span></span>
<span class="line"><span>TEXTI = Textile City  </span></span>
<span class="line"><span>TONGVAH = Tongva Hills  </span></span>
<span class="line"><span>TONGVAV = Tongva Valley  </span></span>
<span class="line"><span>VCANA = Vespucci Canals  </span></span>
<span class="line"><span>VESP = Vespucci  </span></span>
<span class="line"><span>VINE = Vinewood  </span></span>
<span class="line"><span>WINDF = Ron Alternates Wind Farm  </span></span>
<span class="line"><span>WVINE = West Vinewood  </span></span>
<span class="line"><span>ZANCUDO = Zancudo River  </span></span>
<span class="line"><span>ZP_ORT = Port of South Los Santos  </span></span>
<span class="line"><span>ZQ_UAR = Davis Quartz  </span></span>
<span class="line"><span>PROL = Prologue / North Yankton</span></span>
<span class="line"><span>ISHeist = Cayo Perico Island</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>VecCoors_x</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr><tr><td><code>VecCoors_y</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr><tr><td><code>VecCoors_z</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr></tbody></table><p><strong>Returns</strong> <code>string</code> · <strong>Hash</strong> <code>0xCD90657D4C30E1CA</code> · <strong>Lua</strong> <code>GET_NAME_OF_ZONE</code></p><h2 id="getzoneatcoords" tabindex="-1">GetZoneAtCoords <a class="header-anchor" href="#getzoneatcoords" aria-label="Permalink to &quot;GetZoneAtCoords&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetZoneAtCoords</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> VecCoors_x, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> VecCoors_y, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">float</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> VecCoors_z)</span></span></code></pre></div><details class="details custom-block"><summary>No description available</summary><p>This native has no description in the community database. The typed signature above is authoritative; behavior may need testing.</p></details><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>VecCoors_x</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr><tr><td><code>VecCoors_y</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr><tr><td><code>VecCoors_z</code></td><td><code>float</code></td><td><code>FLOAT</code></td></tr></tbody></table><p><strong>Returns</strong> <code>int</code> · <strong>Hash</strong> <code>0x27040C25DE6CB2F4</code> · <strong>Lua</strong> <code>GET_ZONE_AT_COORDS</code></p><h2 id="getzonefromnameid" tabindex="-1">GetZoneFromNameId <a class="header-anchor" href="#getzonefromnameid" aria-label="Permalink to &quot;GetZoneFromNameId&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetZoneFromNameId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nameId)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&#39;zoneName&#39; corresponds to an entry in &#39;popzone.ipl&#39;.  </span></span>
<span class="line"><span>AIRP = Los Santos International Airport  </span></span>
<span class="line"><span>ALAMO = Alamo Sea  </span></span>
<span class="line"><span>ALTA = Alta  </span></span>
<span class="line"><span>ARMYB = Fort Zancudo  </span></span>
<span class="line"><span>BANHAMC = Banham Canyon Dr  </span></span>
<span class="line"><span>BANNING = Banning  </span></span>
<span class="line"><span>BEACH = Vespucci Beach  </span></span>
<span class="line"><span>BHAMCA = Banham Canyon  </span></span>
<span class="line"><span>BRADP = Braddock Pass  </span></span>
<span class="line"><span>BRADT = Braddock Tunnel  </span></span>
<span class="line"><span>BURTON = Burton  </span></span>
<span class="line"><span>CALAFB = Calafia Bridge  </span></span>
<span class="line"><span>CANNY = Raton Canyon  </span></span>
<span class="line"><span>CCREAK = Cassidy Creek  </span></span>
<span class="line"><span>CHAMH = Chamberlain Hills  </span></span>
<span class="line"><span>CHIL = Vinewood Hills  </span></span>
<span class="line"><span>CHU = Chumash  </span></span>
<span class="line"><span>CMSW = Chiliad Mountain State Wilderness  </span></span>
<span class="line"><span>CYPRE = Cypress Flats  </span></span>
<span class="line"><span>DAVIS = Davis  </span></span>
<span class="line"><span>DELBE = Del Perro Beach  </span></span>
<span class="line"><span>DELPE = Del Perro  </span></span>
<span class="line"><span>DELSOL = La Puerta  </span></span>
<span class="line"><span>DESRT = Grand Senora Desert  </span></span>
<span class="line"><span>DOWNT = Downtown  </span></span>
<span class="line"><span>DTVINE = Downtown Vinewood  </span></span>
<span class="line"><span>EAST_V = East Vinewood  </span></span>
<span class="line"><span>EBURO = El Burro Heights  </span></span>
<span class="line"><span>ELGORL = El Gordo Lighthouse  </span></span>
<span class="line"><span>ELYSIAN = Elysian Island  </span></span>
<span class="line"><span>GALFISH = Galilee  </span></span>
<span class="line"><span>GOLF = GWC and Golfing Society  </span></span>
<span class="line"><span>GRAPES = Grapeseed  </span></span>
<span class="line"><span>GREATC = Great Chaparral  </span></span>
<span class="line"><span>HARMO = Harmony  </span></span>
<span class="line"><span>HAWICK = Hawick  </span></span>
<span class="line"><span>HORS = Vinewood Racetrack  </span></span>
<span class="line"><span>HUMLAB = Humane Labs and Research  </span></span>
<span class="line"><span>JAIL = Bolingbroke Penitentiary  </span></span>
<span class="line"><span>KOREAT = Little Seoul  </span></span>
<span class="line"><span>LACT = Land Act Reservoir  </span></span>
<span class="line"><span>LAGO = Lago Zancudo  </span></span>
<span class="line"><span>LDAM = Land Act Dam  </span></span>
<span class="line"><span>LEGSQU = Legion Square  </span></span>
<span class="line"><span>LMESA = La Mesa  </span></span>
<span class="line"><span>LOSPUER = La Puerta  </span></span>
<span class="line"><span>MIRR = Mirror Park  </span></span>
<span class="line"><span>MORN = Morningwood  </span></span>
<span class="line"><span>MOVIE = Richards Majestic  </span></span>
<span class="line"><span>MTCHIL = Mount Chiliad  </span></span>
<span class="line"><span>MTGORDO = Mount Gordo  </span></span>
<span class="line"><span>MTJOSE = Mount Josiah  </span></span>
<span class="line"><span>MURRI = Murrieta Heights  </span></span>
<span class="line"><span>NCHU = North Chumash  </span></span>
<span class="line"><span>NOOSE = N.O.O.S.E  </span></span>
<span class="line"><span>OCEANA = Pacific Ocean  </span></span>
<span class="line"><span>PALCOV = Paleto Cove  </span></span>
<span class="line"><span>PALETO = Paleto Bay  </span></span>
<span class="line"><span>PALFOR = Paleto Forest  </span></span>
<span class="line"><span>PALHIGH = Palomino Highlands  </span></span>
<span class="line"><span>PALMPOW = Palmer-Taylor Power Station  </span></span>
<span class="line"><span>PBLUFF = Pacific Bluffs  </span></span>
<span class="line"><span>PBOX = Pillbox Hill  </span></span>
<span class="line"><span>PROCOB = Procopio Beach  </span></span>
<span class="line"><span>RANCHO = Rancho  </span></span>
<span class="line"><span>RGLEN = Richman Glen  </span></span>
<span class="line"><span>RICHM = Richman  </span></span>
<span class="line"><span>ROCKF = Rockford Hills  </span></span>
<span class="line"><span>RTRAK = Redwood Lights Track  </span></span>
<span class="line"><span>SANAND = San Andreas  </span></span>
<span class="line"><span>SANCHIA = San Chianski Mountain Range  </span></span>
<span class="line"><span>SANDY = Sandy Shores  </span></span>
<span class="line"><span>SKID = Mission Row  </span></span>
<span class="line"><span>SLAB = Stab City  </span></span>
<span class="line"><span>STAD = Maze Bank Arena  </span></span>
<span class="line"><span>STRAW = Strawberry  </span></span>
<span class="line"><span>TATAMO = Tataviam Mountains  </span></span>
<span class="line"><span>TERMINA = Terminal  </span></span>
<span class="line"><span>TEXTI = Textile City  </span></span>
<span class="line"><span>TONGVAH = Tongva Hills  </span></span>
<span class="line"><span>TONGVAV = Tongva Valley  </span></span>
<span class="line"><span>VCANA = Vespucci Canals  </span></span>
<span class="line"><span>VESP = Vespucci  </span></span>
<span class="line"><span>VINE = Vinewood  </span></span>
<span class="line"><span>WINDF = Ron Alternates Wind Farm  </span></span>
<span class="line"><span>WVINE = West Vinewood  </span></span>
<span class="line"><span>ZANCUDO = Zancudo River  </span></span>
<span class="line"><span>ZP_ORT = Port of South Los Santos  </span></span>
<span class="line"><span>ZQ_UAR = Davis Quartz</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>nameId</code></td><td><code>string</code></td><td><code>STRING</code></td></tr></tbody></table><p><strong>Returns</strong> <code>int</code> · <strong>Hash</strong> <code>0x98CD1D2934B76CC1</code> · <strong>Lua</strong> <code>GET_ZONE_FROM_NAME_ID</code></p><h2 id="getzonepopschedule" tabindex="-1">GetZonePopschedule <a class="header-anchor" href="#getzonepopschedule" aria-label="Permalink to &quot;GetZonePopschedule&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetZonePopschedule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> zoneId)</span></span></code></pre></div><details class="details custom-block"><summary>No description available</summary><p>This native has no description in the community database. The typed signature above is authoritative; behavior may need testing.</p></details><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>zoneId</code></td><td><code>int</code></td><td><code>POPZONE_ID</code></td></tr></tbody></table><p><strong>Returns</strong> <code>int</code> · <strong>Hash</strong> <code>0x4334BC40AA0CB4BB</code> · <strong>Lua</strong> <code>GET_ZONE_POPSCHEDULE</code></p><h2 id="getzonescumminess" tabindex="-1">GetZoneScumminess <a class="header-anchor" href="#getzonescumminess" aria-label="Permalink to &quot;GetZoneScumminess&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetZoneScumminess</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> zoneId)</span></span></code></pre></div><p>Gets the zone scumminess level, used to calculate the cellphone signal strength.</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> eZoneScumminess</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    SCUMMINESS_POSH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    SCUMMINESS_NICE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    SCUMMINESS_ABOVE_AVERAGE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    SCUMMINESS_BELOW_AVERAGE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    SCUMMINESS_CRAP</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    SCUMMINESS_SCUM</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>zoneId</code></td><td><code>int</code></td><td><code>POPZONE_ID</code></td></tr></tbody></table><p><strong>Returns</strong> <code>int</code> · <strong>Hash</strong> <code>0x5F7B268D15BA0739</code> · <strong>Lua</strong> <code>GET_ZONE_SCUMMINESS</code></p><h2 id="overridepopschedulevehiclemodel" tabindex="-1">OverridePopscheduleVehicleModel <a class="header-anchor" href="#overridepopschedulevehiclemodel" aria-label="Permalink to &quot;OverridePopscheduleVehicleModel&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">OverridePopscheduleVehicleModel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> schedule, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">uint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ModelIndex)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Only used once in the decompiled scripts. Seems to be related to scripted vehicle generators.  </span></span>
<span class="line"><span>Modified example from &quot;am_imp_exp.c4&quot;, line 6406:  </span></span>
<span class="line"><span>/* popSchedules[0] = ZONE::GET_ZONE_POPSCHEDULE(ZONE::GET_ZONE_AT_COORDS(891.3, 807.9, 188.1));  </span></span>
<span class="line"><span>etc.  </span></span>
<span class="line"><span>*/  </span></span>
<span class="line"><span>ZONE::OVERRIDE_POPSCHEDULE_VEHICLE_MODEL(popSchedules[index], vehicleHash);  </span></span>
<span class="line"><span>STREAMING::REQUEST_MODEL(vehicleHash);</span></span></code></pre></div><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>schedule</code></td><td><code>int</code></td><td><code>POPSCHEDULE_ID</code></td></tr><tr><td><code>ModelIndex</code></td><td><code>uint</code></td><td><code>MODEL_NAMES</code></td></tr></tbody></table><p><strong>Hash</strong> <code>0x5F7D596BAC2E7777</code> · <strong>Lua</strong> <code>OVERRIDE_POPSCHEDULE_VEHICLE_MODEL</code></p><h2 id="setzoneenabled" tabindex="-1">SetZoneEnabled <a class="header-anchor" href="#setzoneenabled" aria-label="Permalink to &quot;SetZoneEnabled&quot;">​</a></h2><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Native.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">SetZoneEnabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> zoneId, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bEnabled)</span></span></code></pre></div><details class="details custom-block"><summary>No description available</summary><p>This native has no description in the community database. The typed signature above is authoritative; behavior may need testing.</p></details><table tabindex="0"><thead><tr><th>Parameter</th><th>Type</th><th>Game type</th></tr></thead><tbody><tr><td><code>zoneId</code></td><td><code>int</code></td><td><code>POPZONE_ID</code></td></tr><tr><td><code>bEnabled</code></td><td><code>bool</code></td><td><code>bool</code></td></tr></tbody></table><p><strong>Hash</strong> <code>0xBA5ECEEA120E5611</code> · <strong>Lua</strong> <code>SET_ZONE_ENABLED</code></p>`,46))])}const b=i(c,[["render",r]]);export{A as __pageData,b as default};
