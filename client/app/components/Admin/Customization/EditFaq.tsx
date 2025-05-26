import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq || []);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("FAQ updated successfully");
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [layoutSuccess, error, refetch]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    const newQuestion = {
      _id: Date.now().toString(),
      question: "",
      answer: "",
      active: true
    };
    setQuestions([...questions, newQuestion]);
  };

  const initializeDefaultFaqs = async () => {
    const defaultFaqs = [
      {
        _id: Date.now().toString(),
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal y transferencias bancarias.",
        active: true
      },
      {
        _id: (Date.now() + 1).toString(),
        question: "¿Ofrecen certificados al completar los cursos?",
        answer: "Sí, al completar satisfactoriamente un curso recibirás un certificado digital verificable que puedes compartir en tu CV o redes profesionales.",
        active: true
      },
      {
        _id: (Date.now() + 2).toString(),
        question: "¿Cuánto tiempo tengo acceso al curso después de comprarlo?",
        answer: "Una vez comprado el curso, tienes acceso ilimitado al contenido. Puedes ver las lecciones cuando quieras y cuantas veces necesites.",
        active: true
      }
    ];

    setQuestions(defaultFaqs);
    
    try {
      await editLayout({
        type: "FAQ",
        faq: defaultFaqs.map(({ question, answer }) => ({
          question,
          answer
        })),
      }).unwrap();
      
      toast.success("FAQs iniciales creadas correctamente");
      refetch();
    } catch (err) {
      console.error("Error creating default FAQs:", err);
      toast.error("Error al crear las FAQs iniciales");
    }
  };

  const areQuestionsUnchanged = (originalQuestions: any[], newQuestions: any[]) => {
    const cleanOriginal = originalQuestions?.map(({ question, answer }) => ({ question, answer })) || [];
    const cleanNew = newQuestions?.map(({ question, answer }) => ({ question, answer })) || [];
    return JSON.stringify(cleanOriginal) === JSON.stringify(cleanNew);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question.trim() === "" || q.answer.trim() === "");
  };

  const handleEdit = async () => {
    if (!questions.length) return;

    if (
      !areQuestionsUnchanged(data?.layout?.faq || [], questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      try {
        const cleanQuestions = questions.map(({ question, answer }) => ({
          question: question.trim(),
          answer: answer.trim()
        }));
        
        await editLayout({
          type: "FAQ",
          faq: cleanQuestions,
        }).unwrap();
      } catch (err) {
        console.error("Error saving FAQ:", err);
        toast.error("Error saving FAQ");
      }
    }
  };

  return (
   <>
   {
    isLoading ? (
        <Loader />
    ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
        <div className="mt-12">
          {questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg mb-4">No hay preguntas frecuentes configuradas</p>
              <button
                className={`${styles.button} !w-[200px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#42d383] !rounded`}
                onClick={initializeDefaultFaqs}
              >
                Crear FAQs Iniciales
              </button>
            </div>
          ) : (
            <>
              <dl className="space-y-8">
                {questions.map((q: any) => (
                  <div
                    key={q._id}
                    className={`${
                      q._id !== questions[0]?._id && "border-t"
                    } border-gray-200 pt-6`}
                  >
                    <dt className="text-lg">
                      <button
                        className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        <input
                          className={`${styles.input} border-none`}
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(q._id, e.target.value)
                          }
                          placeholder={"Add your question..."}
                        />
    
                        <span className="ml-6 flex-shrink-0">
                          {q.active ? (
                            <HiMinus className="h-6 w-6" />
                          ) : (
                            <HiPlus className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {q.active && (
                      <dd className="mt-2 pr-12">
                        <input
                          className={`${styles.input} border-none`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder={"Add your answer..."}
                        />
                        <span className="ml-6 flex-shrink-0">
                          <AiOutlineDelete
                            className="dark:text-white text-black text-[18px] cursor-pointer"
                            onClick={() => {
                              setQuestions((prevQuestions) =>
                                prevQuestions.filter((item) => item._id !== q._id)
                              );
                            }}
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
              <br />
              <br />
              <IoMdAddCircleOutline
                className="dark:text-white text-black text-[25px] cursor-pointer"
                onClick={newFaqHandler}
              />
            </>
          )}
        </div>
  
        <div
          className={`${
            styles.button
          } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
          ${
            areQuestionsUnchanged(data?.layout?.faq || [], questions) ||
            isAnyQuestionEmpty(questions)
              ? "!cursor-not-allowed"
              : "!cursor-pointer !bg-[#42d383]"
          }
          !rounded fixed bottom-12 right-12`}
          onClick={
            areQuestionsUnchanged(data?.layout?.faq || [], questions) ||
            isAnyQuestionEmpty(questions)
              ? () => null
              : handleEdit
          }
        >
          Save
        </div>
      </div>
    )
   }
   </>
  );
};

export default EditFaq;