import { Header } from "@/components/Header";
import { CategoryFaculty } from "@/components/cat-faculty";
import  clientPromise  from '@/lib/mongodb';
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface CategoryInfo {
  /**
   * A TypeScript interface representing information about an academic category.
   *
   * Attributes:
   *     url (string): A URL-friendly version of the category name.
   *     faculty_count (number): The number of faculty members in this category.
   *     department_count (number): The number of departments in this category.
   *     article_count (number): The number of articles in this category.
   *     files (Set<string>): A set of file names associated with this category.
   *     faculty (Set<string>): A set of faculty names in this category.
   *     departments (Set<string>): A set of department names in this category.
   *     titles (Set<string>): A set of article titles in this category.
   *     tc_count (number): Total citation count for articles in this category.
   *     tc_list (number[]): A list of individual citation counts for articles.
   *     citation_average (number): The average number of citations per article.
   *     doi_list (Set<string>): A set of DOIs associated with this category.
   */
  url: string;
  category_name: string,
  faculty_count: number;
  department_count: number;
  article_count: number;
  faculty: string[];
  departments: String[];
  titles: string[];
  tc_count: number;
  citation_average: number;
  doi_list: string[];
  themes: string[]
  
}

export default async function Page() {
  const client = await clientPromise;

  const db = client.db('Site_Data'); // Replace with your actual DB name
  const collection = await db.collection('category_data')
  // Get the last element in the slug array or default to an empty string
  const documents = await collection.find({}).toArray();

  
  // Transform documents to CategoryInfo type
  const categories: CategoryInfo[] = documents.map((doc: any) => ({
    url: doc.url,
    category_name: doc.category_name,
    faculty_count: doc.faculty_count,
    department_count: doc.department_count,
    article_count: doc.article_count,
    faculty: doc.faculty,
    departments: doc.departments,
    titles: doc.titles,
    tc_count: doc.tc_count,
    citation_average: doc.citation_average,
    doi_list: doc.doi_list,
    themes: doc.themes,
  }));
  const chartData: { category: string; faculty: number }[] = categories.map((doc: CategoryInfo) =>({
    category: doc.category_name,
    faculty: doc.faculty_count
  }));

  const shuffleArray = (array: any) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
  
  const newData = shuffleArray(chartData);

  return (
    <>
      <Header />

      
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="container bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Carousel className="w-full max-w-xs md:m-10">
            <CarouselContent>
              {Array.from({ length: newData.length / 5}).map((_, index) => (
                <CarouselItem key={index}>
              
                  <h1>Faculty Per Category</h1>
                  
                  <CategoryFaculty data={newData.slice(index * 5, index * 5 + 5)}/>
                                
                            
                </CarouselItem>
              ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 relative overflow-visible">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl bg-muted bg-opacity-50 hover:bg-opacity-100 transition-transform duration-300 transform hover:scale-125 hover:z-10 text-center flex justify-center items-center"
              style={{
                transformOrigin: getTransformOrigin(i),
              }}
            >
              <div className="bg-white w-4/5 h-4/5 rounded-xl p-4"></div>
            </div>
          ))}
        </div>
      </div> */}
    </> 
  );
}
