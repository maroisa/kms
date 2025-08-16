import { postSubmission } from "../lib/api"

export default function SubmissionUpload({alertRatio, alertSize, ref, refetch}){
    let rawImage
    let imageField
    let closeButton
    let inputRef

    function inputOnChange(event){
        const image = event.target.files[0]

        if (image.size > 4000000){
            alertSize()
            closeButton.click()
            imageField.src = ""
            inputRef.value = ""
            return
        }

        rawImage = image
        imageField.src = URL.createObjectURL(image)
    }

    function imageOnLoaded(event){
        if (imageField.naturalHeight != imageField.naturalWidth){
            alertRatio()
            closeButton.click()
            imageField.src = ""
            inputRef.value = ""
            return
        }
    }

    function imageOnSubmit(event){
        event.preventDefault()
        postSubmission(rawImage).then(res => {
            refetch()
        })
        closeButton.click()
    }

    return <dialog class="modal" ref={ref}>
        <div class="modal-box duration-100">
            <p class="font-bold mb-4 text-lg">Upload Submission</p>
            <img class="aspect-square object-cover h-full" ref={imageField} onload={imageOnLoaded} />
            <form onsubmit={imageOnSubmit}>
                <fieldset class="fieldset">
                    <input type="file" ref={inputRef} onchange={inputOnChange} class="file-input w-full" accept="image/png, image/jpeg" required />
                    <label class="label">- Maksimal ukuran: 4MB</label>
                    <label class="label mb-4">- Aspect Ratio: 1:1</label>

                    <div class="flex gap-2">
                        <button type="button" onclick={() => closeButton.click()} class="grow btn btn-outline">Cancel</button>
                        <button type="submit" class="grow btn btn-primary">Submit</button>
                    </div>
                </fieldset>
            </form>
        </div>
        <form class="modal-backdrop" method="dialog">
            <button ref={closeButton}>Close</button>
        </form>
    </dialog>
}