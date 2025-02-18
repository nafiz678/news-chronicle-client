import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { cn } from "@/lib/utils";

export function Testimonial() {
    const testimonials = [
        {
            src: "https://randomuser.me/api/portraits/women/45.jpg",
            name: "Emily Johnson",
            designation: "Tech Enthusiast",
            quote: "News Chronicle has become my go-to source for breaking news. The interface is clean, and I love the polls and recent news section!"
        },
        {
            src: "https://randomuser.me/api/portraits/men/50.jpg",
            name: "Michael Smith",
            designation: "Business Analyst",
            quote: "Great news coverage! The personalized news feed idea is fantastic. Would love to see more live video updates."
        },
        {
            src: "https://randomuser.me/api/portraits/women/30.jpg",
            name: "Sophia Carter",
            designation: "Fact-Check Specialist",
            quote: "I really enjoy the ‘Fact-Check Corner’ and how it debunks misinformation. The site feels very reliable!"
        },
        {
            src: "https://randomuser.me/api/portraits/men/40.jpg",
            name: "David Miller",
            designation: "Content Creator",
            quote: "The layout is user-friendly, and I like the trending topics section. Adding a dark mode would be awesome!"
        },
        {
            src: "https://randomuser.me/api/portraits/women/20.jpg",
            name: "Olivia Brown",
            designation: "Journalist",
            quote: "As a journalist, I appreciate the ‘Top Contributors’ section. It highlights great writers and their impact!"
        },
        {
            src: "https://randomuser.me/api/portraits/men/35.jpg",
            name: "James Wilson",
            designation: "News Enthusiast",
            quote: "The news is great, but I’d love more interactive content like quizzes and infographics."
        },
        {
            src: "https://randomuser.me/api/portraits/women/25.jpg",
            name: "Emma Thompson",
            designation: "Marketing Specialist",
            quote: "Absolutely love the newsletter subscription! It delivers top stories in an easy-to-read format."
        },
    ];
    return (
        <div>

            <h1 className=" tracking-[0.6rem] font-bold text-gray-800 uppercase text-center">
                <div className="z-10 flex items-center justify-center">
                    <div
                        className={cn(
                            "group rounded-full  mt-10 lg:text-4xl md:text-3xl text-xl text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200  text-nowrap ",
                        )}
                    >
                        <AnimatedShinyText className="inline-flex text-neutral-600 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-700 hover:duration-300">
                            <span>TESTIMONIALS</span>
                        </AnimatedShinyText>
                    </div>
                </div>
            </h1>


            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
