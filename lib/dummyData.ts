/**
 * Some dummy data to have information stored in lieu of a database. This will eventually get moved once a control panel
 * gets implemented on the site (after middleware access is used)
 */
import {BlogPost, EducationEntry, ExperienceEntry, GaugeValue, ProjectBrief, TagElement} from "@/lib/definitions";

export const DummyTechnicalGuageData : GaugeValue[] = [
    {id: "0", name: "Python", barVal: 90},
    {id: "1", name: "Java", barVal: 85},
    {id: "8", name: "Deep Learning", barVal: 85},
    {id: "9", name: "Data Analysis", barVal: 80},
    {id: "2", name: "Typescript", barVal: 80},
    {id: "3", name: "Next.JS", barVal: 70},
    {id: "4", name: "Spring Framework", barVal: 75},
    {id: "5", name: "REST API", barVal: 70},
    {id: "6", name: "HTML/CSS", barVal: 80},
    {id: "7", name: "AWS", barVal: 75}
]

export const DummySoftSkillData : GaugeValue[] = [
    {id: "0", name: "Project Management", barVal: 95},
    {id: "1", name: "Documentation", barVal: 85},
    {id: "2", name: "Communication", barVal: 95},
    {id: "3", name: "Leadership", barVal: 85},
    {id: "4", name: "Adaptability", barVal: 90}
]

export const DummyProjectBriefs : ProjectBrief[] = [
    {
        id: "1",
        title: "Example #1",
        description:
            "An introduction to what this project (1) was about and its contents with a description that is slightly larger than" +
            "the other descriptions to check for characteristics of the overflow...",
        imageRef: null,
    },
    {
        id: "2",
        title: "Example #2",
        description:
            "An introduction to what this project (2) was about",
        imageRef: null,
    },
    {
        id: "3",
        title: "Example #3",
        description:
            "An introduction to what this project (3) was about",
        imageRef: null,
    },
]

export const DummyEducationEntries: EducationEntry[] = [
    {
        id: "3",
        degreeType: "Further Education",
        degreeFocus: "Full Stack Java Development",
        degreeLocation: "Per Scholas",
        degreeStart: "Dec '23",
        degreeEnd: "Mar '24",
        description: {
            topics: ["Java", "Spring Framework", "Web Development", "Typescript", "Next.JS", "React.JS",
                "REST", "Microservices", "HTML/CSS"]
        },
    },
    {
        id: "2",
        degreeType: "MS",
        degreeFocus: "Electrical Engineering (Machine Learning & Data Science)",
        degreeLocation: "University of California - San Diego (UCSD)",
        degreeStart: "Sep 18",
        degreeEnd: "Jun '20",
        description: {
            focus: "Machine Learning & Data Science",
            gpa: 3.34,
            topics: ["Data Analytics", "Deep Learning", "Generative Models", "Python", "Data Mining", "Hadoop",
                "Spark", "Linear Algebra" ,"Git"]
        },
    },
    {
        id: "1",
        degreeType: "BS",
        degreeFocus: "Electrical Engineering",
        degreeLocation: "University of California - San Diego (UCSD)",
        degreeStart: "Sep '14",
        degreeEnd: "Jun '18",
        description: {
            focus: "Machine Learning",
            gpa: 3.73,
            topics: ["ARM C++", "C++", "Rapid Prototyping", "Python", "Machine Learning", "Statistical Learning",
                "Data Structures", "Data Analysis", "Java", "Git", "Project Management", "Computer Vision"]
        },
    },
]

export const DummyExperienceEntries: ExperienceEntry[] = [
    {
        id: "1",
        jobTitle: "Student Research Intern",
        jobLocation: "University of California - San Diego",
        jobTimeStart: "Aug '18",
        jobTimeEnd: "Sep '18",
        jobType: "Research",
        description: {
            bullets: [
                {id: "1", text: "Designed control scheme and software GUI interface for snake-like colonoscopy robot prototype using Python and MATLAB"},
                {id: "2", text: "Tripled robot sensor polling rate by improving on the ARM C-based implementation"},
                {id: "3", text: "Assisted in data collection of robot performance, wrote journal paper drafts, and presented on an MVP publicly"},
            ],
        },
    },
    {
        id: "2",
        jobTitle: "Makerspace Tutor",
        jobLocation: "University of California - San Diego",
        jobTimeStart: "Sep '17",
        jobTimeEnd: "Sep '19",
        jobType: "Contract",
        description: {
            bullets: [
                {id: "1", text: "Increased student course enrollment by re-structuring the face recognition project to expand on" +
                        "theoretical underpinnings and modifying it to use up-to-date APIs"},
                {id: "2", text: "Mentored several student software development teams simultaneously and functioned as a domain expert and " +
                        "scrum leader, ensuring deadlines were met and goals were feasible"},
                {id: "3", text: "Created student resources & documentation for multiple in-development projects to slowly introduce to the course"},
                {id: "4", text: "Researched and implemented minimum viable products for prospective course project ideas in a team of four"},
            ],
            references: [
                {id: "1", type: "Website", description: "Course Site", href: "https://pib.ucsd.edu/"},
                {id: "2", type: "Project", description: "Project Page", href: "https://sites.google.com/view/ece-196/face-recognition"},
                {id: "3", type: "Github", description: "Course Github", href: "https://github.com/ProjectInABox"},
            ]
        }
    },
    {
        id: "3",
        jobTitle: "Teaching Assistant",
        jobLocation: "University of California - San Diego",
        jobTimeStart: "Jul '19",
        jobTimeEnd: "Sep '19",
        jobType: "Contract",
        description: {
            bullets: [
                {id: "1", text: "Engaged in one-on-ones with students during lab sections and office hours sections to futther knowledge of common" +
                        "circuit systems and their issues"},
                {id: "2", text: "Increased student course satisfaction by holding discussion sections that involved difficult-to-solve circuit systems" +
                        "and a more interactive environment"},
            ]
        }
    }
]

/**
 * Used for rendering example for blog post content
 */
const exampleStaticBlogPost = `
    <section>
        <p>
            This is a statically uploaded blog post regarding the progress of development on the site. First thing's first, the
            given post is technically just templated HTML, which can have a few disadvantages when compared to fully planned
             out pages the way we would normally design them in Next.JS. In particular, we lose:
        </p>
        
        <ul>
            <li>Convenient pre-defined css classes via Tailwind/Bootstrap without incorporating further external css files.</li>
            <li>Image serving optimizations provided by Next.JS when using the built-in <code>&lt;Image\&gt;</code> tag</li>
            <li>No simplicity of design via WYSIWYG editing (Namely, we have to design with the site in mind without live previews)</li>
        </ul>
        
        <p>
            But not all is lost! In fact, we can work around this by keeping these negatives in mind while designing the page.
            We would want all of our elements to pretty much conform to the typical design associated with the blog and only
            further complicate via in-line styles if completely necessary. While this may seem like an issue, there really isn't
            much reason to break the flow of legibility in a page with in-line images or anything of that sort (at least for now).
            Collections of images may require some wrangling with divs and flex or grid layouts, but it wouldn't come by frequently
            enough to be an issue.
        </p>
    </section>
    
    <section>
        <h3>Frontend Progress </h3>
    
        <p>
            So with that stated, we can start with the general overview of the progress that has been made in the site. In particular,
            we can see that the <a href="/work">Experience</a> page and the <a href="/">About</a> pages have been properly implemented.
            However, of note is that they are currently just static pages. The backend is planned to be hosted on AWS
            and served using Java's Spring Framework on EC2 via a RESTful API. There are other factors that are planned to become in play in the backend,
            but I will keep it simple for now as this particular section is more a description of what's going on with the front-end.
        </p>
        
        <p>
            The design of the page seems to work decently well, but there potentially might be an issue with text coloring once
            it gets swapped to dark mode. I plan to revisit any off-looking components once it's set in stone, but that will likely
            be one of the last tasks to deal with as it's not necessary for base site functionality. With design in-mind, the blog
            may actually still change in appearance to something a bit more friendly for a technical blog, but for now the current
            design will suffice with presenting header image previews along with the post title.
        </p>
        
        <p>
            Since the blog is mostly second to the purpose of the site, it will likely take more time to receive updates. 
            For example, since the tag selection will not be relevant until the backend is completely connected, the current
            skeleton gives a sufficient idea about how things will work out when connected with the backend. The ony thing
            that would be relevant to add onto the blog would be a table of contents on the left-hand side post view layout so that users can navigate to a
            specific section of the blog easily. DigitalOcean has a pretty nice looking blog with a gauge on the top to roughly indicate
            the amount of page left, but it seems unnecessary to try and replicate that completely. One problem that comes to
            mind would be management of section tag names, as this would likely need to be scraped off the content post and
            then cached on the server side.
        </p>
        
    </section>
        
    <section>
        <h3>Backend Progress</h3>
    
        <p>
            Currently, the backend only has some object types defined along with their corresponding 1-1 DAOs and service / 
            repository layer entities established. For all functions I would need to define a REST based request for any
            type of data that I might need. While creating the REST API isn't a huge issue, it can be a huge pain having
            to redefine and manage DAO entities manually. Upon investigating, I did come across GraphQL which seems to address
            part of the problem, but having to deal with an entirely new API seems a bit overkill for a simple project like this.
            More investigation will be needed for the serving part of the backend.
        </p>
        
        <p>
            Furthermore, some investigation was placed into packaging the entire Spring server into a Docker container, which 
            would be automatically uploaded to AWS and then used to launch an updated instance of the server of EC2. The later
            half has yet to be realized (as it requires a bit more messing with scripting and startup tasks), but that will
            likely take place after actual connectivity is finished. The purpose of such an action is largely in the spirit of
            CI/CD, but it's also just in case I happen to forget to re-launch the backend following an update to the backend repository.
        </p>
    
        <figure>
            <img src="ResumeServerArchitecture-1.png" alt="Current ideal architecture of the site" height="500" width="100%"/>
            
            <figcaption>
                <p style="white-space: nowrap"><strong>Figure 1)</strong></p>
                <p>
                    The planned site architecture. Thick black lines indicate the main flow of
                    requests while the red lines indicate event triggers. The dotted black line is simply an indicator of API
                    access being limited to the EC2 instance.
                </p>
            </figcaption>
        </figure>
        
        <p>
            And now for the general model of the back-end along with the (yet-to-be actualized) front-end connection on Vercel.
            Data remains relative up until it hits the frontend, at which point the frontend combines the known CDN with the postID and
            the given image name such that the final path is then converted to <code>CLOUDFRONT_ORIGIN/dynamic/POST_ID/IMAGE_NAME</code>
            and properly rendered on the client's end without revealing too much about the backing S3 bucket. It also makes it a bit less
            easy to accidentally mess up with image filenames as they only need to be kept unique with respect to the given post.
        </p>
        
        <p>
            Cloudfront also seems to be putting in a bunch of work as a CDN since it simplified serving directly from the S3 bucket (and serving
            cached content is generally cheaper than serving fresh content directly from the bucket anyway). In either case, the one
            caveat is that performing page updates can become quite complicated without applying some sort of versioning (as 
            invalidations cost money...). This will require a bit of round-about logic in the server end, but it shouldn't be too big of
            an issues as updates won't generally come frequently enough to run out of image names.
        </p>
    </section>
    
    <section>
        <h3>Looking Ahead...</h3>
        
        <p>
            Despite the fair amount of progress being made, it does feel like there's just as much to work on as when this project
            started. Sure, layouts now seem fine, but several questions arose as a result: 
        </p>
        
        <ol>
            <li>How will the admin dashboard look and feel like? </li>       
            <li>How are blog posts to be created in a way that can allow for live previewing of the HTML data?</li>
            <li>How can certain elements be simplified to prevent redundancy on the backend?</li>
        </ol>
        
        <p>
            Despite all of these questions arising as a result of the progress being made, I am confident that each one of them
            will be resolved in a satisfactory manner. Since I'm not the most familiar with web development practices (nor with
            general dev ops activities in the backend/frontend), all of these questions will deserve their own fair share of
            investigation.
        </p>
    </section>
`

export const DummyPostData : BlogPost[] = [
    {
        id: "1",
        postTitle: "First Post & Site Status",
        headerImage: "servers.png",
        content: exampleStaticBlogPost,
        postDate: "April 13, 2024",
        postTags: [
            {id: "1", tagName: "Front-end"},
            {id: "2", tagName: "Back-end"},
            {id: "3", tagName: "Updates"},
        ],
    },
]

export const DummyTagData : TagElement[] = [
    {id: "1", tagName: "Front-end"},
    {id: "2", tagName: "Back-end"},
    {id: "3", tagName: "Updates"},
]