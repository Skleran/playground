// import ComponentWrapper from "@/components/custom/component-wrapper";
import FixedReturnButton from "@/components/custom/fixed-return-button";
import {
  SideNavigation,
  TOCContent,
  TOCHeader,
  TOCProvider,
} from "@/components/custom/toc";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    // <ComponentWrapper>
    <TOCProvider>
      <div className="min-h-8 relative lg:hidden">
        <header className="absolute pt-6 px-1.5">
          <FixedReturnButton />
        </header>
      </div>
      <div className="max-lg:hidden min-h-20 fixed top-6 left-[calc(50%-460px)] z-10">
        <header className="">
          <FixedReturnButton />
        </header>
      </div>
      <SideNavigation>
        <div>
          <TOCHeader id="intro">Introduction</TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p>
                This is the introduction content of the page. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Delectus quaerat tempora
                commodi minus quas temporibus assumenda repellendus, quae fuga
                mollitia beatae vero porro minima earum architecto asperiores
                ipsum voluptas. Illo quo tenetur corporis aspernatur? Nesciunt,
                voluptatibus debitis ipsa architecto quis officia eos voluptas
                soluta iste est, consectetur reprehenderit, aut incidunt? Cum
                error provident, in iste, numquam accusamus deleniti voluptas
                obcaecati quod maxime ut sequi libero? Sapiente dicta minus
                dolorum maiores autem tempore adipisci labore quibusdam nisi,
                officia dolorem aut. Unde possimus optio nesciunt aperiam atque
                quibusdam, velit esse voluptates ipsum
              </p>
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/BlueRays.jpeg"
                  alt="Blue Rays"
                  className="rounded-3xl object-cover"
                />
              </div>
              <p>
                saepe repudiandae laudantium debitis aliquam est ea itaque
                corrupti ad. Officiis repellendus quae provident tempora aut
                reiciendis ad placeat voluptatum adipisci quasi tenetur
                exercitationem, nemo ratione, eveniet at, cumque iste atque
                consequuntur fuga repudiandae modi explicabo sit? Placeat rerum
                voluptatem, et exercitationem non quo nulla laboriosam ipsam
                quod, nihil quae deserunt consequatur hic. Explicabo autem atque
                aliquam quam, consequatur incidunt fugiat quo illo? Nostrum,
                minima. Asperiores quas nihil consequatur illum libero odit sit
                vitae est cupiditate veritatis minus dolores modi aliquid unde
                incidunt quia deserunt ad, magnam officia aliquam laboriosam a
                impedit repellat? Placeat dicta debitis libero accusamus nulla
                numquam doloremque ullam beatae ipsa, perferendis ad veniam
                temporibus, ex quam?
              </p>
            </div>
          </TOCContent>
        </div>

        <div>
          <TOCHeader id="timing">
            Timing: When to prioritize enterprise readiness
          </TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p></p>
              Information about timing and prioritization... Lorem ipsum dolor
              sit, amet consectetur adipisicing elit. Sed, laborum! Dolor in nam
              quos iure ratione! Praesentium commodi rerum voluptatum cumque,
              quam perspiciatis doloremque reprehenderit velit blanditiis sequi
              nemo, voluptate beatae minus sunt iusto harum. Aliquam magnam
              obcaecati sint repellendus beatae ab commodi illo iure culpa nobis
              ad, assumenda libero a dolore sunt at ipsum delectus doloremque
              nisi. Voluptas dignissimos repellat, dicta culpa aliquid numquam
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Celestials.jpeg"
                  alt="Celestials"
                  className="rounded-3xl object-cover"
                />
              </div>
              consectetur, sapiente veritatis quam facilis quidem reprehenderit,
              tenetur illum rem doloremque aperiam laborum molestias totam ut
              praesentium sunt provident. A, facilis commodi saepe sunt
              voluptate nihil blanditiis quisquam repellat rerum temporibus iste
              cupiditate amet fugit natus iusto libero quod, atque laborum sequi
              non consequatur! Adipisci excepturi voluptate, pariatur molestias
              odit, doloremque sequi voluptatibus nesciunt vitae maxime
              reprehenderit commodi autem consectetur quos odio praesentium sunt
              tenetur officia magnam earum eum ab facilis. Fugit unde aut quam
              cum omnis est iste nesciunt consequatur soluta sit aperiam nihil,
              accusantium repellendus dolorem nostrum accusamus vel quae fuga
              obcaecati. Nostrum voluptate pariatur aspernatur, rem commodi
              blanditiis voluptatibus numquam. Eos numquam consectetur ut sit
              earum ratione rerum commodi officia, hic impedit cupiditate
              consequatur voluptas reiciendis fuga consequuntur modi aut aperiam
              atque, omnis ipsa? Voluptatem facilis ipsam est aspernatur ratione
              delectus reiciendis
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Dreamy-Fabrica.jpeg"
                  alt="Dreamy Fabrica"
                  className="rounded-3xl object-cover"
                />
              </div>
              quae in enim amet eaque illo atque repudiandae ullam mollitia,
              libero similique fugit, sit omnis eius quos rem at quas.
              Doloremque doloribus illo ab, dignissimos facere vitae porro
              magnam excepturi ipsam, aspernatur culpa. Velit atque quisquam
              natus, similique, aut iure beatae perferendis minima ex ad
              distinctio id amet, repellendus eveniet.
            </div>
          </TOCContent>
        </div>

        <div>
          <TOCHeader id="personas">Personas: Know your customer(s)</TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p></p>
              Details about customer personas and their needs... Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Voluptatum saepe
              modi vitae nostrum sed, ad itaque? Dolore unde expedita eveniet
              sit aut iste, itaque esse voluptatum ea asperiores vitae cum hic
              alias sint corrupti sunt ipsa. Officiis dicta corporis debitis
              soluta nobis! Rem alias sit iure ducimus, expedita modi saepe
              impedit temporibus mollitia amet. Beatae dicta ratione doloribus
              excepturi aliquam
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Fractal-Night.jpeg"
                  alt="Fractal Night"
                  className="rounded-3xl object-cover"
                />
              </div>
              eveniet facere cupiditate, porro facilis error soluta totam eaque
              voluptates sint, enim maiores fugit quidem a consectetur, amet
              molestias. Ab sed beatae quae quisquam maxime debitis, nulla culpa
              excepturi quod mollitia distinctio ipsam, perferendis praesentium
              placeat cum aliquam consequuntur doloremque provident rerum
              voluptas atque alias molestias impedit dolorum. Atque consectetur
              ipsam iure incidunt molestiae, quas pariatur? Magni voluptas
              consectetur fugiat dolore quas velit dicta inventore nesciunt
              ratione nobis, minus
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Lemonade.jpeg"
                  alt="Lemonade"
                  className="rounded-3xl object-cover"
                />
              </div>
              earum officia mollitia placeat expedita. Nostrum vel minus ea
              eligendi quaerat corrupti esse, odio illo hic vero. Molestias,
              saepe facilis. Odit sequi autem blanditiis voluptates velit ad vel
              eius nam. Quia consequatur culpa qui corrupti, soluta praesentium
              enim repudiandae nisi eligendi, ut rem at officia dicta
              perspiciatis quasi excepturi placeat doloribus optio autem nobis
              modi alias. Maiores, inventore est blanditiis eum cumque earum
              laborum? Modi consectetur eum nesciunt ratione, sed cupiditate
              fuga saepe, ducimus harum non eos voluptatibus quasi velit fugiat
              maxime alias, necessitatibus dolor aut quo? Maiores mollitia
              assumenda animi enim officiis, fugiat dolores neque quia amet qui
              quam, temporibus quae consectetur nemo, quo dolor cum quas
              sapiente numquam aliquid! Magnam, assumenda tenetur? Quasi officia
              aut eligendi eveniet explicabo qui.
            </div>
          </TOCContent>
        </div>

        <div>
          <TOCHeader id="this">How does This Vault work?</TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p></p>
              Details about customer personas and their needs... Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Voluptatum saepe
              modi vitae nostrum sed, ad itaque? Dolore unde expedita eveniet
              sit aut iste, itaque esse voluptatum ea asperiores vitae cum hic
              alias sint corrupti sunt ipsa. Officiis dicta corporis debitis
              soluta nobis! Rem alias sit iure ducimus, expedita modi saepe
              impedit temporibus mollitia amet. Beatae dicta ratione doloribus
              excepturi aliquam
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Mistnova.jpeg"
                  alt="Mistnova"
                  className="rounded-3xl object-cover"
                />
              </div>
              eveniet facere cupiditate, porro facilis error soluta totam eaque
              voluptates sint, enim maiores fugit quidem a consectetur, amet
              molestias. Ab sed beatae quae quisquam maxime debitis, nulla culpa
              excepturi quod mollitia distinctio ipsam, perferendis praesentium
              placeat cum aliquam consequuntur doloremque provident rerum
              voluptas atque alias molestias impedit dolorum. Atque consectetur
              ipsam iure incidunt molestiae, quas pariatur? Magni voluptas
              consectetur fugiat dolore quas velit dicta inventore nesciunt
              ratione nobis, minus
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Shadeshifter.jpg"
                  alt="Shadeshifter"
                  className="rounded-3xl object-cover"
                />
              </div>
              earum officia mollitia placeat expedita. Nostrum vel minus ea
              eligendi quaerat corrupti esse, odio illo hic vero. Molestias,
              saepe facilis. Odit sequi autem blanditiis voluptates velit ad vel
              eius nam. Quia consequatur culpa qui corrupti, soluta praesentium
              enim repudiandae nisi eligendi, ut rem at officia dicta
              perspiciatis quasi excepturi placeat doloribus optio autem nobis
              modi alias. Maiores, inventore est blanditiis eum cumque earum
              laborum? Modi consectetur eum nesciunt ratione, sed cupiditate
              fuga saepe, ducimus harum non eos voluptatibus quasi velit fugiat
              maxime alias, necessitatibus dolor aut quo? Maiores mollitia
              assumenda animi enim officiis, fugiat dolores neque quia amet qui
              quam, temporibus quae consectetur nemo, quo dolor cum quas
              sapiente numquam aliquid! Magnam, assumenda tenetur? Quasi officia
              aut eligendi eveniet explicabo qui.
            </div>
          </TOCContent>
        </div>

        <div>
          <TOCHeader id="data">
            Data Revocation and Cryptographic Deletion
          </TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p></p>
              Details about customer personas and their needs... Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Voluptatum saepe
              modi vitae nostrum sed, ad itaque? Dolore unde expedita eveniet
              sit aut iste, itaque esse voluptatum ea asperiores vitae cum hic
              alias sint corrupti sunt ipsa. Officiis dicta corporis debitis
              soluta nobis! Rem alias sit iure ducimus, expedita modi saepe
              impedit temporibus mollitia amet. Beatae dicta ratione doloribus
              excepturi aliquam
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/SwiftGlow.jpg"
                  alt="Swift Glow"
                  className="rounded-3xl object-cover"
                />
              </div>
              eveniet facere cupiditate, porro facilis error soluta totam eaque
              voluptates sint, enim maiores fugit quidem a consectetur, amet
              molestias. Ab sed beatae quae quisquam maxime debitis, nulla culpa
              excepturi quod mollitia distinctio ipsam, perferendis praesentium
              placeat cum aliquam consequuntur doloremque provident rerum
              voluptas atque alias molestias impedit dolorum. Atque consectetur
              ipsam iure incidunt molestiae, quas pariatur? Magni voluptas
              consectetur fugiat dolore quas velit dicta inventore nesciunt
              ratione nobis, minus
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/BlueRays.jpeg"
                  alt="Blue Rays"
                  className="rounded-3xl object-cover"
                />
              </div>
              earum officia mollitia placeat expedita. Nostrum vel minus ea
              eligendi quaerat corrupti esse, odio illo hic vero. Molestias,
              saepe facilis. Odit sequi autem blanditiis voluptates velit ad vel
              eius nam. Quia consequatur culpa qui corrupti, soluta praesentium
              enim repudiandae nisi eligendi, ut rem at officia dicta
              perspiciatis quasi excepturi placeat doloribus optio autem nobis
              modi alias. Maiores, inventore est blanditiis eum cumque earum
              laborum? Modi consectetur eum nesciunt ratione, sed cupiditate
              fuga saepe, ducimus harum non eos voluptatibus quasi velit fugiat
              maxime alias, necessitatibus dolor aut quo? Maiores mollitia
              assumenda animi enim officiis, fugiat dolores neque quia amet qui
              quam, temporibus quae consectetur nemo, quo dolor cum quas
              sapiente numquam aliquid! Magnam, assumenda tenetur? Quasi officia
              aut eligendi eveniet explicabo qui.
            </div>
          </TOCContent>
        </div>

        <div>
          <TOCHeader id="something">
            Bring-Your-Own-Key (BYOK) for Ultimate Data Control
          </TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p></p>
              Details about customer personas and their needs... Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Voluptatum saepe
              modi vitae nostrum sed, ad itaque? Dolore unde expedita eveniet
              sit aut iste, itaque esse voluptatum ea asperiores vitae cum hic
              alias sint corrupti sunt ipsa. Officiis dicta corporis debitis
              soluta nobis! Rem alias sit iure ducimus, expedita modi saepe
              impedit temporibus mollitia amet. Beatae dicta ratione doloribus
              excepturi aliquam
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Celestials.jpeg"
                  alt="Celestials"
                  className="rounded-3xl object-cover"
                />
              </div>
              eveniet facere cupiditate, porro facilis error soluta totam eaque
              voluptates sint, enim maiores fugit quidem a consectetur, amet
              molestias. Ab sed beatae quae quisquam maxime debitis, nulla culpa
              excepturi quod mollitia distinctio ipsam, perferendis praesentium
              placeat cum aliquam consequuntur doloremque provident rerum
              voluptas atque alias molestias impedit dolorum. Atque consectetur
              ipsam iure incidunt molestiae, quas pariatur? Magni voluptas
              consectetur fugiat dolore quas velit dicta inventore nesciunt
              ratione nobis, minus
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Dreamy-Fabrica.jpeg"
                  alt="Dreamy Fabrica"
                  className="rounded-3xl object-cover"
                />
              </div>
              earum officia mollitia placeat expedita. Nostrum vel minus ea
              eligendi quaerat corrupti esse, odio illo hic vero. Molestias,
              saepe facilis. Odit sequi autem blanditiis voluptates velit ad vel
              eius nam. Quia consequatur culpa qui corrupti, soluta praesentium
              enim repudiandae nisi eligendi, ut rem at officia dicta
              perspiciatis quasi excepturi placeat doloribus optio autem nobis
              modi alias. Maiores, inventore est blanditiis eum cumque earum
              laborum? Modi consectetur eum nesciunt ratione, sed cupiditate
              fuga saepe, ducimus harum non eos voluptatibus quasi velit fugiat
              maxime alias, necessitatibus dolor aut quo? Maiores mollitia
              assumenda animi enim officiis, fugiat dolores neque quia amet qui
              quam, temporibus quae consectetur nemo, quo dolor cum quas
              sapiente numquam aliquid! Magnam, assumenda tenetur? Quasi officia
              aut eligendi eveniet explicabo qui.
            </div>
          </TOCContent>
        </div>

        <div>
          <TOCHeader id="other">
            Auditability: Full Transparency and Control
          </TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p></p>
              Details about customer personas and their needs... Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Voluptatum saepe
              modi vitae nostrum sed, ad itaque? Dolore unde expedita eveniet
              sit aut iste, itaque esse voluptatum ea asperiores vitae cum hic
              alias sint corrupti sunt ipsa. Officiis dicta corporis debitis
              soluta nobis! Rem alias sit iure ducimus, expedita modi saepe
              impedit temporibus mollitia amet. Beatae dicta ratione doloribus
              excepturi aliquam
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Fractal-Night.jpeg"
                  alt="Fractal Night"
                  className="rounded-3xl object-cover"
                />
              </div>
              eveniet facere cupiditate, porro facilis error soluta totam eaque
              voluptates sint, enim maiores fugit quidem a consectetur, amet
              molestias. Ab sed beatae quae quisquam maxime debitis, nulla culpa
              excepturi quod mollitia distinctio ipsam, perferendis praesentium
              placeat cum aliquam consequuntur doloremque provident rerum
              voluptas atque alias molestias impedit dolorum. Atque consectetur
              ipsam iure incidunt molestiae, quas pariatur? Magni voluptas
              consectetur fugiat dolore quas velit dicta inventore nesciunt
              ratione nobis, minus
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Lemonade.jpeg"
                  alt="Lemonade"
                  className="rounded-3xl object-cover"
                />
              </div>
              earum officia mollitia placeat expedita. Nostrum vel minus ea
              eligendi quaerat corrupti esse, odio illo hic vero. Molestias,
              saepe facilis. Odit sequi autem blanditiis voluptates velit ad vel
              eius nam. Quia consequatur culpa qui corrupti, soluta praesentium
              enim repudiandae nisi eligendi, ut rem at officia dicta
              perspiciatis quasi excepturi placeat doloribus optio autem nobis
              modi alias. Maiores, inventore est blanditiis eum cumque earum
              laborum? Modi consectetur eum nesciunt ratione, sed cupiditate
              fuga saepe, ducimus harum non eos voluptatibus quasi velit fugiat
              maxime alias, necessitatibus dolor aut quo? Maiores mollitia
              assumenda animi enim officiis, fugiat dolores neque quia amet qui
              quam, temporibus quae consectetur nemo, quo dolor cum quas
              sapiente numquam aliquid! Magnam, assumenda tenetur? Quasi officia
              aut eligendi eveniet explicabo qui.
            </div>
          </TOCContent>
        </div>

        <div>
          <TOCHeader id="qwe">Speed is Critical</TOCHeader>
          <TOCContent>
            <div className="relative flex flex-col text-muted-foreground">
              <p></p>
              Details about customer personas and their needs... Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Voluptatum saepe
              modi vitae nostrum sed, ad itaque? Dolore unde expedita eveniet
              sit aut iste, itaque esse voluptatum ea asperiores vitae cum hic
              alias sint corrupti sunt ipsa. Officiis dicta corporis debitis
              soluta nobis! Rem alias sit iure ducimus, expedita modi saepe
              impedit temporibus mollitia amet. Beatae dicta ratione doloribus
              excepturi aliquam
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Mistnova.jpeg"
                  alt="Mistnova"
                  className="rounded-3xl object-cover"
                />
              </div>
              eveniet facere cupiditate, porro facilis error soluta totam eaque
              voluptates sint, enim maiores fugit quidem a consectetur, amet
              molestias. Ab sed beatae quae quisquam maxime debitis, nulla culpa
              excepturi quod mollitia distinctio ipsam, perferendis praesentium
              placeat cum aliquam consequuntur doloremque provident rerum
              voluptas atque alias molestias impedit dolorum. Atque consectetur
              ipsam iure incidunt molestiae, quas pariatur? Magni voluptas
              consectetur fugiat dolore quas velit dicta inventore nesciunt
              ratione nobis, minus
              <div className="w-full h-100 relative my-6">
                <Image
                  fill
                  src="/images/Shadeshifter.jpg"
                  alt="Shadeshifter"
                  className="rounded-3xl object-cover"
                />
              </div>
              earum officia mollitia placeat expedita. Nostrum vel minus ea
              eligendi quaerat corrupti esse, odio illo hic vero. Molestias,
              saepe facilis. Odit sequi autem blanditiis voluptates velit ad vel
              eius nam. Quia consequatur culpa qui corrupti, soluta praesentium
              enim repudiandae nisi eligendi, ut rem at officia dicta
              perspiciatis quasi excepturi placeat doloribus optio autem nobis
              modi alias. Maiores, inventore est blanditiis eum cumque earum
              laborum? Modi consectetur eum nesciunt ratione, sed cupiditate
              fuga saepe, ducimus harum non eos voluptatibus quasi velit fugiat
              maxime alias, necessitatibus dolor aut quo? Maiores mollitia
              assumenda animi enim officiis, fugiat dolores neque quia amet qui
              quam, temporibus quae consectetur nemo, quo dolor cum quas
              sapiente numquam aliquid! Magnam, assumenda tenetur? Quasi officia
              aut eligendi eveniet explicabo qui.
            </div>
          </TOCContent>
        </div>
      </SideNavigation>
    </TOCProvider>
    // </ComponentWrapper>
  );
}
