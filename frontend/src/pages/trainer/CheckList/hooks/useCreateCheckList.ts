import { CheckList, TrainingI } from 'entities/checklist';
import { FormEvent } from 'react';

export default function useCreateCheckList({
	id,
	students
}: {
	id: number | string;
	students: number[] | string[];
}) {
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const result: TrainingI[] = [];
		const formElements = e.currentTarget.elements as HTMLFormControlsCollection;

		for (const el of formElements) {
			const inputElement = el as HTMLInputElement;
			if (!inputElement.id) continue;
			if (inputElement.checked) {
				result.push({
					training_id: +inputElement.value,
					repetitions: 1,
					assessment: 1
				});
			}
		}

		const data = {
			lesson_id: id,
			student_ids: students,
			training_check: result
		};

		createCheckList(data);
	}

	async function createCheckList(data: any) {
		const [, err] = await CheckList.create(data);
		if (err) return;
	}

	return handleSubmit;
}
