import { createResource, createSignal, For, Suspense } from "solid-js";
import BackNavbar from "../../components/BackNavbar";
import RatioAlert from "../../components/RatioAlert";
import SubmissionItem from "../../components/SubmissionItem";
import SubmissionUpload from "../../components/SubmissionUpload";
import SizeAlert from "../../components/SizeAlert";
import { getSubmission } from "../../lib/api";
import SubmissionSkeleton from "../../components/SubmissionSkeleton";

const [submissions, {refetch}] = createResource(async () => {
    const res = await getSubmission()
    return res
})

export default function Submission(){
    let submissionModal

    const [ratioAlertActive, setRatioAlertActive] = createSignal(false)
    const [sizeAlertActive, setSizeAlertActive] = createSignal(false)

    return <div class="h-full">
        <BackNavbar title="Submission" />

        <SubmissionUpload
            ref={submissionModal}
            alertSize={() => setSizeAlertActive(true)}
            alertRatio={() => setRatioAlertActive(true)}
            refetch={refetch}
        />

        <RatioAlert active={ratioAlertActive} setActive={setRatioAlertActive} />
        <SizeAlert active={sizeAlertActive} setActive={setSizeAlertActive} />

        <button 
            class="aspect-square fixed bottom-0 right-0 z-2 m-4 p-6 h-auto btn btn-primary rounded-full"
            onclick={() => submissionModal.open = true}
        >
            <span class="font-bold text-xl">+</span>
        </button>
        
        <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 items-center p-4 gap-4">
                <Suspense fallback={<SubmissionSkeleton />}>
                    <For each={submissions()}>
                        {item => <SubmissionItem item={item} refetch={refetch} />}
                    </For>
                </Suspense>
            </div>
        </div>
        
    </div>
}