/**
 * Allows a closer view of what the project was about, along with potential information like the relevant stack, objectives,
 * etc.
 *
 * Currently, unsure how this will be implemented, but given how the criteria can vary between project to project, a
 * document-based approach is likely to be the relevant consideration here.
 */

export default async function SpecificProjectPage({ params } : { params : { id : string } }) {
    return (
        <>
            This is a reference to project page {params.id}!
        </>
    )
}