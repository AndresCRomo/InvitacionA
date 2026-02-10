import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";


import { useRef, useState } from "react";

const pages = [
    { type: "image", src: "/src/assets/inv1.png" },
    { type: "image", src: "/src/assets/inv2.png" },
    { type: "lodging" }, // 👈 tercera página especial
    { type: "image", src: "/src/assets/inv3.png" },
    { type: "rsvp"}
];


export function RSVPForm({ setTyping }) {
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
        name: "",
        attending: true,
        guests: 1,
        message: "",
    });
    const formRef = useRef(null);
    const handleFocus = () => {
    setTyping(true);
    setTimeout(() => {
        formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        });
    }, 350);
    };

    const handleBlur = () => {
    setTyping(false);
    };

    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 👈 evita doble submit

    setLoading(true);

    const body = new URLSearchParams(form).toString();

    try {
        await fetch(
        "https://script.google.com/macros/s/AKfycbylTSJayTs1ROLylol7fPYwionWd0wpBRxyNhr43FJbg8vdzQhkS3aEoBohMdIHvHI/exec",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        }
        );

        setSent(true);
    } catch (err) {
        console.error(err);
        setLoading(false); // 👈 solo reactivar si falló
    }
    };


    if (sent) {
        return (
        <div className="p-2 bg-[#fdfbf7] rounded-xl">
            <div className="flex flex-col border-2 p-8 border-[#A7B9C8] rounded-xl">
                <p
                    className="text-center text-xl font-fanttor font-bold text-[#1F2A44]"
                    >
                    ¡Gracias por confirmar tu asistencia!
                </p>
                {form.attending && 
                    (
                        <div>
                            <h2 className="text-center text-xl font-fanttor font-bold text-[#1F2A44]">¡Te Esperamos!</h2>
                            
                        </div>
                    )
                }
            </div>
        </div>    
        );
    }

    return (
        <motion.form
        onSubmit={handleSubmit}
        ref={formRef}
        className=" backdrop-blur w-87.5 md:w-[40vw] max-w-md bg-[#fdfbf7] rounded-xl shadow-lg p-2 text-center"
        >
            <div className="border-2 p-8 gap-6 border-[#A7B9C8] rounded-xl flex flex-col">
                <h2 className="text-2xl mb-6 text-[#1F2A44] font-ebgaramond font-semibold">
                    Confirma tu asistencia
                </h2>
                <input
                    placeholder="Tu nombre completo"
                    required
                    className="p-3 rounded-lg bg-white/90 shadow-sm text-[#1F2A44]"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <div className="flex items-center justify-evenly">
                    <span className="text-[#1F2A44] font-ebgaramond font-bold text-xl">
                        {form.attending ? "Asistiré 💍" : "No podré asistir"}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                        setForm({ ...form, attending: !form.attending })
                        }
                        className={`relative w-14 h-8 rounded-full transition
                        ${form.attending ? "bg-[#1F2A44]" : "bg-gray-300"}
                        `}
                    >
                        <span
                        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition
                            ${form.attending ? "translate-x-6" : ""}
                        `}
                        />
                    </button>
                </div>
                <h2 className="text-xl text-[#1F2A44] font-fanttor font-semibold">
                        Numero de Acompañantes <br /> (Incluyendote)
                </h2>
                <input
                    type="number"
                    min="1"
                    className="p-2 rounded border"
                    placeholder="Acompañantes"
                    value={form.guests}
                    onChange={(e) =>
                    setForm({ ...form, guests: e.target.value })
                    }
                />
                

                <textarea
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Mensaje (opcional)"
                    className="p-2 rounded border"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                />

                <button
                disabled={loading}
                className={`
                    bg-[#1F2A44] text-white py-3 rounded-full tracking-wide transition
                    ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#2a3a63]"}
                `}
                >
                {loading ? "Enviando..." : "Confirmar asistencia"}
                </button>
            </div>
        </motion.form>
    );
}

function LodgingOptions() {
    return (
        <div className="w-87.5 md:w-[40vw] max-w-md bg-[#fdfbf7] rounded-xl shadow-lg p-2 text-center">
            <div className="border-2 p-8 border-[#A7B9C8] rounded-xl">
                <h2 className="text-2xl mb-6 text-[#1F2A44] font-ebgaramond font-semibold">
                    Opciones de Hospedaje
                </h2>

                <div className="space-y-6 flex flex-col">
                    {[
                    {
                        name: "Hotel Hilaria",
                        desc: "Zona centro",
                        url: "https://ghs.channex.io/2e292299-1855-4bfa-a994-bbdad7676ff0?checkinDate=2025-11-27&checkoutDate=2025-11-28&adults=2"
                    },
                    {
                        name: "Hotel Marriott",
                        desc: "Zona norte",
                        url: "https://www.marriott.com/es/search/findHotels.mi?pageType=advanced&searchType=InCity&destinationAddress.latitude=21.927115&destinationAddress.longitude=-102.290611&destinationAddress.destination=Aguascalientes+Marriott+Hotel&nst=paid&cid=PAI_GLB0004N15_GLE000ARON_GLF000M11O&ppc=ppc&pId=rztbppc&gclsrc=aw.ds&gad_source=1&gad_campaignid=10520901317&gbraid=0AAAAADilnidKTvPFtrhcRkYg7V5dLfPdl&gclid=CjwKCAiA1obMBhAbEiwAsUBbIpF_Lg3EqQhjoGa9-6A7HyoMUzgWt7dZXtIlUbkmanIWoVeUvyddDxoCMuoQAvD_BwE&deviceType=desktop-web&view=list&isInternalSearch=true&vsInitialRequest=false&for-hotels-nearme=Near&collapseAccordian=is-hidden&singleSearch=true&singleSearchAutoSuggest=Unmatched&flexibleDateSearchRateDisplay=false&isSearch=true&isRateCalendar=true&recordsPerPage=40&destinationAddress.location=Aguascalientes+Marriott+Hotel&searchRadius=50&isTransient=true&initialRequest=true&fromToDate=02/03/2026&fromToDate_submit=05/02/2026&fromDate=01/05/2026&toDate=02/05/2026&toDateDefaultFormat=05/02/2026&fromDateDefaultFormat=05/01/2026&flexibleDateSearch=true&isHideFlexibleDateCalendar=false&t-start=2026-05-01&t-end=2026-05-02&isFlexibleDatesOptionSelected=true&lengthOfStay=1&roomCount=1&numAdultsPerRoom=1&childrenCount=0&clusterCode=none&numberOfRooms=1#/3/"
                    },
                    {
                        name: "Hotel Hilton Garden Inn",
                        desc: "Zona norte",
                        url: "https://www.hilton.com/es/hotels/agugigi-hilton-garden-inn-aguascalientes/"
                    },
                    ].map((item, i) => (
                    <a href={item.url || "#"} target="_blank" rel="noopener noreferrer">

                        <div
                            key={i}
                            className="border border-[#1F2A44]/10 rounded-lg p-4 hover:bg-[#1F2A44]/5 active:bg-[#1F2A44]/10 transition font-fanttor"
                            >
                            <p className="font-semibold text-xl text-[#1F2A44]">{item.name}</p>
                            <p className="text-sm text-[#1F2A44]/70">{item.desc}</p>
                        </div>
                    </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PageSection({ page, setTyping }) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
        ref={ref}
        className="scroll-section min-h-screen flex justify-center items-center relative"
        >
        <motion.div style={{ y, scale, opacity }} className="relative">
            {page.type === "image" && (
            <img
                src={page.src}
                draggable={false}
                className="w-87.5 md:w-[40vw] max-w-md rounded-xl"
            />
            )}

            {page.type === "lodging" && <LodgingOptions />}
            {page.type === "rsvp" && <RSVPForm setTyping={setTyping} />}
            

        </motion.div>
        </section>
    );
}

export function InvitationPages() {
    const { scrollY } = useScroll();
    const [hideHint, setHideHint] = useState(false);
    const [typing, setTyping] = useState(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 80) setHideHint(true);
    });

return (
    <div className="h-fit">
        <div className={`relative flex flex-col items-center ${
    typing ? "snap-none" : "snap-y snap-mandatory"
    }`}>
            {!hideHint && (
                <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [10, 0, 10] }}
                transition={{
                    opacity: { duration: 0.6 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                }}
                className="
                    sticky
                    p-2
                    backdrop-blur-xl 
                    rounded-lg 
                    top-16
                    md:top-20
                    z-40
                    text-center
                    text-[#ffffff]
                    text-xl
                    font-bold
                    md:text-2xl
                    pointer-events-none
                    font-fanttor
                "
                >
                Descubre la invitación ↓
                </motion.p>
            )}
            {pages.map((page, i) => (
                <PageSection key={i} page={page} setTyping={setTyping} />
            ))}
        </div>
        
    </div>
);
}
