'use client';

import { useState } from 'react';
import ClickButton from '@/components/ui/button/click-button';
import { ModalBox } from '@/components/ui/dialogueBox/modal-box';

const TermsAndCondition: React.FC = () => {
  const [tcModalOpen, setTcModalOpen] = useState<boolean>(false);

  return (
    <div id="">
      <ClickButton
        id='terms-conditions-button'
        onClick={() => setTcModalOpen(true)}
        variant="none"
        size="none"
        className="text-secondary-800 font-semibold underline"
      >
        Terms & Conditions
      </ClickButton>

      <ModalBox
        isOpen={tcModalOpen}
        onClose={() => setTcModalOpen(false)}
        title="Terms & Conditions"
        subtitle="Please accept the terms and conditions"
        mainContainerStyle_mb="min-w-full min-h-full"
      >
        <div className="terms-conditions-modal mb-2 h-36 overflow-y-auto">
          <p className="text-sm text-gray-500">
            By signing up, you agree to our Terms of Service and acknowledge
            that you have read and understand our Privacy Policy. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Quisquam, architecto
            velit magni cupiditate ratione quia enim hic esse impedit,
            praesentium nam? Officiis ipsa, reprehenderit explicabo quisquam
            maiores accusamus iure eveniet. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Dolorum similique iure et hic
            architecto, velit nam fugiat voluptas, nihil repellendus quaerat
            reiciendis fugit dignissimos. A numquam adipisci veniam fugit enim.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet est
            vitae tempore facilis error minus magni magnam aliquam numquam odit
            tenetur quod hic, obcaecati neque iusto. Rerum dolores temporibus
            in! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
            voluptates reiciendis ratione ab commodi laborum aliquam dolore
            temporibus et nihil corporis ut eligendi qui deleniti reprehenderit
            delectus, nulla, neque incidunt. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Minus tempora recusandae facilis velit
            error officiis mollitia corrupti tenetur, voluptatem laboriosam
            dolores unde aspernatur minima alias perspiciatis autem consequatur
            omnis praesentium! Corporis consectetur asperiores molestias ut
            excepturi fugiat. Cum itaque, beatae sit architecto optio
            repellendus? Delectus, itaque. Hic illum similique eveniet quod,
            beatae fugiat voluptatibus doloremque, ullam dicta voluptas atque
            aliquid quaerat, sapiente sint placeat debitis eos! Repellendus
            exercitationem id illum itaque, numquam expedita accusantium unde
            inventore voluptatibus obcaecati enim veniam blanditiis. Quia quo,
            sit accusantium beatae molestias possimus. Inventore, minima harum
            esse alias veritatis aperiam illum cupiditate neque nemo
            exercitationem deserunt sed, impedit aspernatur non ad eos sapiente
            vitae rerum! Ut, perferendis molestias optio aliquid provident alias
            reprehenderit. Consectetur aspernatur qui aliquid dolor dignissimos
            facere sint, excepturi corporis maxime officiis ab eveniet odit,
            quod nostrum ratione! Aliquam qui deserunt esse corrupti.
          </p>
        </div>
      </ModalBox>
    </div>
  );
};

export default TermsAndCondition;
