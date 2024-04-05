# Self-Hosted Resume Page

Still a WIP of a Next.JS based resume page to be hosted on Vercel. I'll get to dealing
with a todo list in the README soon, but for now I'm just trying to hack out
the general structure of how the page will be like.

# TODO
* Finish the work and projects pages
* Connect Spring back-end on AWS EC2 + RDS RPC to front-end
* Move from hard-coded dummy data to something on the server side
  * Investigate document-based DB for more unstructured type of data?
* Implement page-info page, which shows how the page was designed and progress was 
carried out until completion
* Move static elements out of public folder to S3 bucket
* Adjust image serving from Github profile to S3 provided static avatar
  * Mask endpoint via GET request to node server -> S3/DynamoDB ***or*** server DB?
* Fix any optimization issues that might arise from image serving through
caching available through Next.JS.
* Maybe implement animations aside from those baked into provided components.
  * Page transitions?
  * Panels?